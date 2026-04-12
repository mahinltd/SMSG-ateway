// ©2026 SMS GATEWAY Mahin Ltd develop by (Tanvir)
import { useEffect, useMemo, useState } from 'react'
import ConnectDeviceModal from '../components/ConnectDeviceModal'
import LoadingSpinner from '../components/LoadingSpinner'
import Sidebar from '../components/Sidebar'
import api from '../services/api'

function normalizeDevices(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.devices)) {
    return payload.devices
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  return []
}

function isDisplayableDevice(device) {
  const status = String(device?.status || '').trim().toLowerCase()
  const androidDeviceId = String(
    device?.deviceId || device?.device_id || device?.androidDeviceId || device?.android_device_id || '',
  )
    .trim()
    .toLowerCase()

  const hasValidAndroidDeviceId =
    androidDeviceId.length > 0 &&
    !['pending', 'temp', 'temporary', 'unknown', 'null', 'undefined'].includes(androidDeviceId)

  const hasConnectedStatus = ['online', 'connected', 'disconnected'].includes(status)

  return hasValidAndroidDeviceId || hasConnectedStatus
}

function DevicesPage() {
  const [devices, setDevices] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [revokeInProgress, setRevokeInProgress] = useState('')

  const onlineCount = useMemo(
    () =>
      devices.filter((device) =>
        ['online', 'connected', true].includes(
          typeof device?.status === 'string'
            ? device.status.toLowerCase()
            : device?.status,
        ),
      ).length,
    [devices],
  )

  const loadDevices = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await api.get('/devices')
      const filteredDevices = normalizeDevices(response.data).filter(isDisplayableDevice)
      setDevices(filteredDevices)
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          requestError?.response?.data?.error ||
          'Failed to load devices. Please try again.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadDevices()
  }, [])

  const handleRevoke = async (id) => {
    setRevokeInProgress(id)

    try {
      await api.delete(`/devices/${id}`)
      setDevices((previous) => previous.filter((item) => String(item._id || item.id) !== String(id)))
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          requestError?.response?.data?.error ||
          'Could not disconnect device.',
      )
    } finally {
      setRevokeInProgress('')
    }
  }

  return (
    <>
      <main className="min-h-screen px-4 py-6 md:px-6">
        <div className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-[260px_1fr]">
          <Sidebar />

          <section className="space-y-4">
            <header className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Device Management</p>
                  <h2 className="mt-2 text-3xl font-semibold text-white">Connected Devices</h2>
                  <p className="mt-2 text-slate-300">
                    Manage Android clients currently paired with your account.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Connect New Device
                </button>
              </div>

              <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-300">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_2px_rgba(74,222,128,0.6)]" />
                {onlineCount} device(s) online
              </div>
            </header>

            <div className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-5 shadow-xl shadow-blue-950/20 backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Device List</h3>
                <button
                  type="button"
                  onClick={loadDevices}
                  className="rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-slate-200 transition hover:bg-slate-700"
                >
                  Refresh
                </button>
              </div>

              {isLoading ? (
                <div className="flex items-center gap-2 text-slate-300">
                  <LoadingSpinner />
                  Loading devices...
                </div>
              ) : null}

              {!isLoading && error ? (
                <p className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
                  {error}
                </p>
              ) : null}

              {!isLoading && !error && devices.length === 0 ? (
                <p className="text-sm text-slate-300">
                  No devices connected yet. Use Connect New Device to pair one.
                </p>
              ) : null}

              {!isLoading && !error && devices.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm text-slate-200">
                    <thead>
                      <tr className="border-b border-slate-700 text-xs uppercase tracking-[0.12em] text-slate-400">
                        <th className="px-3 py-3">Name</th>
                        <th className="px-3 py-3">Status</th>
                        <th className="px-3 py-3">Selected SIM</th>
                        <th className="px-3 py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {devices.map((device) => {
                        const id = String(device._id || device.id || '')
                        const statusValue =
                          typeof device.status === 'string'
                            ? device.status.toLowerCase()
                            : device.status
                        const isOnline = ['online', 'connected', true].includes(statusValue)
                        const displayName =
                          device.name || device.deviceName || device.phoneModel || 'Unnamed Device'

                        return (
                          <tr key={id || displayName} className="border-b border-slate-700/60">
                            <td className="px-3 py-3 font-medium text-white">{displayName}</td>
                            <td className="px-3 py-3">
                              <span className="inline-flex items-center gap-2">
                                <span
                                  className={`h-2.5 w-2.5 rounded-full ${
                                    isOnline
                                      ? 'bg-emerald-400 shadow-[0_0_12px_2px_rgba(74,222,128,0.6)]'
                                      : 'bg-rose-500 shadow-[0_0_10px_1px_rgba(244,63,94,0.35)]'
                                  }`}
                                />
                                <span className={isOnline ? 'text-emerald-300' : 'text-rose-300'}>
                                  {isOnline ? 'Online' : 'Offline'}
                                </span>
                              </span>
                            </td>
                            <td className="px-3 py-3 text-slate-300">
                              {device.selectedSim || device.sim || device.simSlot || 'N/A'}
                            </td>
                            <td className="px-3 py-3 text-right">
                              <button
                                type="button"
                                onClick={() => handleRevoke(id)}
                                disabled={!id || revokeInProgress === id}
                                className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-rose-200 transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                {revokeInProgress === id ? 'Disconnecting...' : 'Disconnect'}
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </main>

      <ConnectDeviceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default DevicesPage
