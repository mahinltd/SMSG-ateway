// ©2026 SMS GATEWAY Mahin Ltd Developed By Tanvir
import { useEffect, useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import api from '../services/api'

function normalizeSettings(payload) {
  if (!payload || typeof payload !== 'object') {
    return {}
  }

  if (payload.data && typeof payload.data === 'object' && !Array.isArray(payload.data)) {
    return payload.data
  }

  if (payload.settings && typeof payload.settings === 'object' && !Array.isArray(payload.settings)) {
    return payload.settings
  }

  return payload
}

function AdminSettings() {
  const [form, setForm] = useState({
    bkashNumber: '',
    nagadNumber: '',
    rocketNumber: '',
    appPrice: '',
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchSettings = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await api.get('/admin/settings')
      const settings = normalizeSettings(response?.data?.data || response?.data)

      setForm({
        bkashNumber: String(settings?.bkashNumber ?? settings?.bKashNumber ?? ''),
        nagadNumber: String(settings?.nagadNumber ?? ''),
        rocketNumber: String(settings?.rocketNumber ?? ''),
        appPrice: String(settings?.appPrice ?? ''),
      })
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          requestError?.response?.data?.error ||
          'Failed to load settings.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    setError('')
    setSuccess('')

    const payload = {
      bkashNumber: form.bkashNumber.trim(),
      nagadNumber: form.nagadNumber.trim(),
      rocketNumber: form.rocketNumber.trim(),
      appPrice: Number(form.appPrice),
    }

    try {
      await api.put('/admin/settings', payload)
      setSuccess('System settings updated successfully.')
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          requestError?.response?.data?.error ||
          'Could not update system settings.',
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <header className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Settings</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">System Settings</h2>
        <p className="mt-2 text-slate-300">Update payment receiver numbers and application pricing.</p>
      </header>

      <section className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-300">Settings are synced from the deployed admin configuration API.</p>
          <button
            type="button"
            onClick={fetchSettings}
            disabled={isLoading || isSaving}
            className="rounded-lg border border-slate-600 px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-700"
          >
            {isLoading ? 'Refreshing...' : 'Reload'}
          </button>
        </div>

        {error ? (
          <p className="mb-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
            {error}
          </p>
        ) : null}

        {success ? (
          <p className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
            {success}
          </p>
        ) : null}

        {isLoading ? (
          <div className="flex items-center gap-2 py-8 text-slate-300">
            <LoadingSpinner />
            Loading settings...
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-slate-200" htmlFor="bkashNumber">
                  bKash Number
                </label>
                <input
                  id="bkashNumber"
                  name="bkashNumber"
                  type="text"
                  value={form.bkashNumber}
                  onChange={handleChange}
                  placeholder="01XXXXXXXXX"
                  className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-200" htmlFor="nagadNumber">
                  Nagad Number
                </label>
                <input
                  id="nagadNumber"
                  name="nagadNumber"
                  type="text"
                  value={form.nagadNumber}
                  onChange={handleChange}
                  placeholder="01XXXXXXXXX"
                  className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-200" htmlFor="rocketNumber">
                  Rocket Number
                </label>
                <input
                  id="rocketNumber"
                  name="rocketNumber"
                  type="text"
                  value={form.rocketNumber}
                  onChange={handleChange}
                  placeholder="01XXXXXXXXX"
                  className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-200" htmlFor="appPrice">
                  App Price (BDT)
                </label>
                <input
                  id="appPrice"
                  name="appPrice"
                  type="number"
                  min="0"
                  step="1"
                  value={form.appPrice}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-900"
            >
              {isSaving ? (
                <>
                  <LoadingSpinner />
                  Saving...
                </>
              ) : (
                'Save Settings'
              )}
            </button>
          </form>
        )}
      </section>
    </>
  )
}

export default AdminSettings
