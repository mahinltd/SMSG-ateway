// ©2026 SMS GATEWAY Mahin Ltd Developed By Tanvir
import { useEffect, useMemo, useState } from 'react'
import { Download } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import api from '../services/api'

function parseTokenPayload(token) {
  try {
    const payload = String(token || '').split('.')[1]

    if (!payload || typeof window === 'undefined') {
      return null
    }

    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
    const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4)

    return JSON.parse(window.atob(padded))
  } catch {
    return null
  }
}

function resolvePaidStatus(payload) {
  const value =
    payload?.user?.isPaid ??
    payload?.isPaid ??
    payload?.user?.paid ??
    payload?.paid ??
    payload?.subscription?.isPaid

  return Boolean(value)
}

function normalizePublicSettings(payload) {
  const source = payload?.data && typeof payload.data === 'object' ? payload.data : payload

  return {
    bkashNumber: String(source?.bkashNumber ?? source?.bKashNumber ?? ''),
    nagadNumber: String(source?.nagadNumber ?? ''),
    rocketNumber: String(source?.rocketNumber ?? ''),
    appPrice: source?.appPrice ?? source?.price ?? 0,
  }
}

function DownloadPage() {
  const { token } = useAuth()
  const { t } = useLanguage()
  const [settings, setSettings] = useState({
    bkashNumber: '',
    nagadNumber: '',
    rocketNumber: '',
    appPrice: 0,
  })
  const [isLoadingSettings, setIsLoadingSettings] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [form, setForm] = useState({
    method: 'bKash',
    senderPhone: '',
    trxId: '',
  })

  const isPaid = useMemo(() => {
    const payload = parseTokenPayload(token)
    return resolvePaidStatus(payload)
  }, [token])

  useEffect(() => {
    if (isPaid) {
      return
    }

    const fetchPublicSettings = async () => {
      setIsLoadingSettings(true)
      setError('')

      try {
        const response = await api.get('/settings/public')
        setSettings(normalizePublicSettings(response?.data?.data || response?.data))
      } catch (requestError) {
        setError(
          requestError?.response?.data?.message ||
            requestError?.response?.data?.error ||
            'Could not load payment details right now. Please try again shortly.',
        )
      } finally {
        setIsLoadingSettings(false)
      }
    }

    fetchPublicSettings()
  }, [isPaid])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')

    const payload = {
      paymentMethod: form.method,
      method: form.method,
      senderPhone: form.senderPhone.trim(),
      phoneNumber: form.senderPhone.trim(),
      trxId: form.trxId.trim(),
      transactionId: form.trxId.trim(),
    }

    try {
      await api.post('/payment/submit', payload)
      setIsSubmitted(true)
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          requestError?.response?.data?.error ||
          'Payment submission failed. Please verify details and try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen px-4 py-6 md:px-6">
      <div className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-[260px_1fr]">
        <Sidebar />

        <section className="space-y-4">
          <header className="overflow-hidden rounded-2xl border border-slate-700/80 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 shadow-xl shadow-blue-950/30 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-300">{t('download.mobileClient')}</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">{t('download.title')}</h2>
            {isPaid ? (
              <>
                <p className="mt-3 max-w-2xl text-slate-300">
                  Thank you for your purchase. Your account is active and ready for app download.
                </p>

                <a
                  href="/app-release.apk"
                  download
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-500"
                >
                  <Download size={18} />
                  {t('download.downloadApk')}
                </a>
              </>
            ) : (
              <p className="mt-3 max-w-2xl text-slate-300">
                Access is currently locked. Please complete manual payment to unlock Android app download.
              </p>
            )}
          </header>

          {isPaid ? (
            <article className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
              <h3 className="text-lg font-semibold text-white">{t('download.beforeInstall')}</h3>
              <p className="mt-2 text-slate-300">{t('download.beforeInstallDescription')}</p>
            </article>
          ) : (
            <>
              <article className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Payment Required</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">Complete manual payment to unlock download</h3>

                {isLoadingSettings ? (
                  <p className="mt-4 text-slate-300">Loading payment details...</p>
                ) : (
                  <>
                    <div className="mt-5 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-blue-300">App Price</p>
                      <p className="mt-1 text-3xl font-semibold text-white">BDT {settings.appPrice || 0}</p>
                    </div>

                    <div className="mt-5 grid gap-3 md:grid-cols-3">
                      <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
                        <p className="text-xs uppercase tracking-[0.16em] text-slate-400">bKash</p>
                        <p className="mt-1 text-sm font-semibold text-white">{settings.bkashNumber || 'Not available'}</p>
                      </div>
                      <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
                        <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Nagad</p>
                        <p className="mt-1 text-sm font-semibold text-white">{settings.nagadNumber || 'Not available'}</p>
                      </div>
                      <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
                        <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Rocket</p>
                        <p className="mt-1 text-sm font-semibold text-white">{settings.rocketNumber || 'Not available'}</p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-xl border border-slate-700 bg-slate-900/60 p-4 text-sm leading-7 text-slate-300">
                      <p className="font-semibold text-white">How to pay:</p>
                      <ol className="mt-2 list-decimal space-y-1 pl-5">
                        <li>Send money to any one number above using bKash, Nagad, or Rocket.</li>
                        <li>Keep your sender phone number and TrxID.</li>
                        <li>Submit payment details in the form below for admin verification.</li>
                      </ol>
                    </div>
                  </>
                )}
              </article>

              <article className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
                <h3 className="text-lg font-semibold text-white">Submit payment details</h3>

                {error ? (
                  <p className="mt-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
                    {error}
                  </p>
                ) : null}

                {isSubmitted ? (
                  <p className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-3 text-sm text-emerald-200">
                    Your payment request is being reviewed by the admin. Please wait 5-10 minutes and refresh this page. You will also receive an email confirmation.
                  </p>
                ) : (
                  <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className="mb-1 block text-sm text-slate-200" htmlFor="method">
                        Payment Method
                      </label>
                      <select
                        id="method"
                        name="method"
                        value={form.method}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-blue-500"
                        required
                      >
                        <option value="bKash">bKash</option>
                        <option value="Nagad">Nagad</option>
                        <option value="Rocket">Rocket</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm text-slate-200" htmlFor="senderPhone">
                        Sender Phone Number
                      </label>
                      <input
                        id="senderPhone"
                        name="senderPhone"
                        type="text"
                        value={form.senderPhone}
                        onChange={handleChange}
                        placeholder="01XXXXXXXXX"
                        className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm text-slate-200" htmlFor="trxId">
                        Transaction ID (TrxID)
                      </label>
                      <input
                        id="trxId"
                        name="trxId"
                        type="text"
                        value={form.trxId}
                        onChange={handleChange}
                        placeholder="e.g. 8H4K2N9P"
                        className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-900"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Payment'}
                    </button>
                  </form>
                )}
              </article>
            </>
          )}
        </section>
      </div>
    </main>
  )
}

export default DownloadPage
