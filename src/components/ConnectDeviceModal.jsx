// ©2026 Application or Website Name Mahin Ltd develop by (Tanvir)
import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import api from '../services/api'
import LoadingSpinner from './LoadingSpinner'

async function requestConnectionToken() {
  const candidates = [
    () =>
      api.post('/devices/generate-token', {
        deviceName: 'Web Dashboard',
      }),
    () => api.post('/devices/generate-token'),
  ]

  let lastError = null

  for (const candidate of candidates) {
    try {
      const response = await candidate()
      const token =
        response?.data?.connection_token ||
        response?.data?.connectionToken ||
        response?.data?.token

      if (token) {
        return String(token)
      }
    } catch (error) {
      lastError = error
    }
  }

  throw lastError || new Error('No connection token returned by API')
}

function ConnectDeviceModal({ isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [connectionToken, setConnectionToken] = useState('')

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const generateToken = async () => {
      setIsLoading(true)
      setError('')
      setConnectionToken('')

      try {
        const token = await requestConnectionToken()
        setConnectionToken(token)
      } catch (requestError) {
        if (import.meta.env.DEV) {
          console.error('Failed to generate device token', {
            status: requestError?.response?.status,
            data: requestError?.response?.data,
          })
        }

        setError(
          requestError?.response?.data?.message ||
            requestError?.response?.data?.error ||
            requestError?.response?.data?.details ||
            requestError.message ||
            'Could not generate connection token.',
        )
      } finally {
        setIsLoading(false)
      }
    }

    generateToken()
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-2xl shadow-blue-950/40">
        <h3 className="text-xl font-semibold text-white">Connect New Device</h3>
        <p className="mt-1 text-sm text-slate-300">
          Scan this code using your Android SMS Gateway app.
        </p>

        <div className="mt-6 flex flex-col items-center gap-4">
          {isLoading ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-900/70 px-6 py-8 text-slate-300">
              <LoadingSpinner size="h-8 w-8" />
              Generating secure connection token...
            </div>
          ) : null}

          {!isLoading && error ? (
            <p className="w-full rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
              {error}
            </p>
          ) : null}

          {!isLoading && !error && connectionToken ? (
            <>
              <div className="rounded-xl bg-white p-4 shadow-lg shadow-black/30">
                <QRCodeSVG
                  value={connectionToken}
                  size={220}
                  bgColor="#ffffff"
                  fgColor="#0f172a"
                  includeMargin
                />
              </div>

              <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-blue-300">Manual Token</p>
                <p className="mt-1 text-3xl font-bold tracking-[0.18em] text-white">
                  {connectionToken}
                </p>
              </div>
            </>
          ) : null}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConnectDeviceModal
