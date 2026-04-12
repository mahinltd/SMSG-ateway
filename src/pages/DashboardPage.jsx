// ©2026 SMS GATEWAY Mahin Ltd develop by (Tanvir)
import { useEffect, useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import Sidebar from '../components/Sidebar'
import api from '../services/api'

function DashboardPage() {
  const [stats, setStats] = useState({
    activeDevices: 0,
    smsSentToday: 0,
    queuedMessages: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  const fetchStats = async () => {
    setIsLoading(true)

    try {
      const response = await api.get('/stats')
      const payload = response?.data?.data || response?.data || {}

      setStats({
        activeDevices: payload?.activeDevices ?? payload?.active_devices ?? 0,
        smsSentToday: payload?.smsSentToday ?? payload?.sms_sent_today ?? 0,
        queuedMessages: payload?.queuedMessages ?? payload?.queued_messages ?? 0,
      })
    } catch {
      setStats({
        activeDevices: 0,
        smsSentToday: 0,
        queuedMessages: 0,
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <main className="min-h-screen px-4 py-6 md:px-6">
      <div className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-[260px_1fr]">
        <Sidebar />

        <section className="space-y-4">
          <header className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Overview</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Premium Messaging Workspace</h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              Live operational metrics from your SMS Gateway backend.
            </p>
          </header>

          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-xl border border-slate-700/80 bg-slate-800 p-5">
              <p className="text-sm text-slate-400">Active Devices</p>
              <p className="mt-2 flex items-center gap-2 text-3xl font-semibold text-white">
                {isLoading ? <LoadingSpinner /> : null}
                {isLoading ? '...' : stats.activeDevices}
              </p>
            </article>
            <article className="rounded-xl border border-slate-700/80 bg-slate-800 p-5">
              <p className="text-sm text-slate-400">SMS Sent Today</p>
              <p className="mt-2 flex items-center gap-2 text-3xl font-semibold text-white">
                {isLoading ? <LoadingSpinner /> : null}
                {isLoading ? '...' : stats.smsSentToday}
              </p>
            </article>
            <article className="rounded-xl border border-slate-700/80 bg-slate-800 p-5">
              <p className="text-sm text-slate-400">Queued Messages</p>
              <p className="mt-2 flex items-center gap-2 text-3xl font-semibold text-white">
                {isLoading ? <LoadingSpinner /> : null}
                {isLoading ? '...' : stats.queuedMessages}
              </p>
            </article>
          </div>

          <div className="rounded-xl border border-slate-700/80 bg-slate-800 p-5">
            <button
              type="button"
              onClick={fetchStats}
              disabled={isLoading}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              {isLoading ? 'Refreshing...' : 'Refresh Overview'}
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}

export default DashboardPage
