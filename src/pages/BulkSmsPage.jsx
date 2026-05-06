// ©2026 SMS GATEWAY Mahin Ltd develop by (Tanvir)
import { useEffect, useMemo, useState } from 'react'
import { Users } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

function normalizeList(payload, key) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.[key])) return payload[key]
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

export default function BulkSmsPage() {
  const { token } = useAuth()
  const [devices, setDevices] = useState([])
  const [isLoadingDevices, setIsLoadingDevices] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [form, setForm] = useState({ deviceId: '', simSlot: '0', phoneNumbers: '', message: '' })
  const [error, setError] = useState('')

  const androidDevices = useMemo(() => devices.filter((d) => {
    const type = String(d?.type || d?.platform || '').toLowerCase()
    return ['android', 'android_client', 'android-client', 'mobile'].includes(type) || !!(d?.deviceId || d?._id || d?.id)
  }), [devices])

  useEffect(() => {
    const fetchDevices = async () => {
      setIsLoadingDevices(true)
      try {
        const res = await api.get('/devices')
        const list = normalizeList(res.data, 'devices')
        setDevices(list)
        const firstAndroid = String(list.find((device) => device?._id || device?.id)?._id || list.find((device) => device?._id || device?.id)?.id || '')
        setForm((prev) => ({ ...prev, deviceId: prev.deviceId || firstAndroid }))
      } catch (err) {
        setError(err?.response?.data?.message || 'Could not load devices')
      } finally {
        setIsLoadingDevices(false)
      }
    }

    fetchDevices()
  }, [token])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSending(true)

    try {
      const rawNumbers = String(form.phoneNumbers || '').split(/[\,\n]+/)
      const receivers = rawNumbers.map((n) => n.trim()).filter((n) => n.length > 0)

      if (receivers.length === 0) {
        setError('Please enter at least one phone number')
        setIsSending(false)
        return
      }

      await api.post('/messages/bulk', {
        receivers,
        message: form.message,
        simSlot: form.simSlot,
        deviceId: form.deviceId,
      })

      alert('Bulk SMS queued successfully! Messages will be sent with a 3-second delay.')

      setForm({ deviceId: form.deviceId, simSlot: '0', phoneNumbers: '', message: '' })
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to queue bulk SMS')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <main className="min-h-screen px-4 py-6 md:px-6">
      <div className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-[260px_1fr]">
        <Sidebar />

        <section className="space-y-4">
          <header className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Bulk SMS</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Send Bulk SMS</h2>
            <p className="mt-3 text-slate-300">Send messages to multiple recipients (comma or newline separated).</p>
          </header>

          {error ? (
            <p className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{error}</p>
          ) : null}

          <div className="grid gap-4 xl:grid-cols-5">
            <article className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-5 shadow-xl shadow-blue-950/20 xl:col-span-3">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-1 block text-sm text-slate-200">Device</label>
                  <select name="deviceId" value={form.deviceId} onChange={handleChange} required disabled={isLoadingDevices || isSending} className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-blue-500">
                    <option value="">{isLoadingDevices ? 'Loading devices...' : androidDevices.length === 0 ? 'No Android Device Connected' : 'Select an Android device'}</option>
                    {androidDevices.map((d) => {
                      const id = String(d?._id || d?.id || '')
                      const name = d?.name || d?.deviceName || d?.phoneModel || 'Device'
                      return <option key={id || name} value={id}>{name}</option>
                    })}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm text-slate-200">Sim Slot</label>
                  <select name="simSlot" value={form.simSlot} onChange={handleChange} disabled={isSending} className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-blue-500">
                    <option value="0">Sim Slot 0</option>
                    <option value="1">Sim Slot 1</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm text-slate-200">Phone Numbers (comma or newline separated)</label>
                  <textarea name="phoneNumbers" rows={6} required value={form.phoneNumbers} onChange={handleChange} disabled={isSending} placeholder="+8801XXXXXXXXX, +8801YYYYYYYYY" className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500" />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-slate-200">Message</label>
                  <textarea name="message" rows={6} required value={form.message} onChange={handleChange} disabled={isSending} placeholder="Write your SMS here..." className="w-full resize-y rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500" />
                </div>

                <div>
                  <button type="submit" disabled={isSending || !form.deviceId} className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-900">
                    {isSending ? <><LoadingSpinner /> Sending... Please wait</> : 'Queue Bulk SMS'}
                  </button>
                </div>
              </form>
            </article>
          </div>
        </section>
      </div>
    </main>
  )
}
