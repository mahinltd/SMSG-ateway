// ©2026 SMS GATEWAY Mahin Ltd Developed By Tanvir
import { useEffect, useState } from 'react'
import api from '../services/api'

function BroadcastEmail() {
  const [target, setTarget] = useState('all')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (!toast) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      setToast(null)
    }, 3500)

    return () => {
      window.clearTimeout(timer)
    }
  }, [toast])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSending(true)
    setToast(null)

    try {
      await api.post('/admin/broadcast', {
        target,
        subject: subject.trim(),
        message: message.trim(),
      })

      setToast({
        type: 'success',
        text: 'Broadcast email sent successfully.',
      })
      setSubject('')
      setMessage('')
    } catch (requestError) {
      setToast({
        type: 'error',
        text:
          requestError?.response?.data?.message ||
          requestError?.response?.data?.error ||
          'Failed to send broadcast email.',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
      <div className="mb-5">
        <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Broadcast</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">Mass Email Broadcast</h3>
        <p className="mt-2 text-sm text-slate-300">
          Send app updates or URL change notices to users from the admin panel.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 block text-sm text-slate-200" htmlFor="broadcastTarget">
            Target Audience
          </label>
          <select
            id="broadcastTarget"
            value={target}
            onChange={(event) => setTarget(event.target.value)}
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-blue-500"
            required
          >
            <option value="all">All Users</option>
            <option value="paid">Premium/Paid Users Only</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-200" htmlFor="broadcastSubject">
            Email Subject
          </label>
          <input
            id="broadcastSubject"
            type="text"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            placeholder="Important update about SMS Gateway"
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-200" htmlFor="broadcastMessage">
            Email Message
          </label>
          <textarea
            id="broadcastMessage"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={7}
            placeholder="You can include links and HTML content in this message."
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSending}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-900"
        >
          {isSending ? 'Sending...' : 'Send Broadcast'}
        </button>
      </form>

      {toast ? (
        <div
          className={`fixed right-4 top-4 z-50 rounded-lg border px-4 py-3 text-sm shadow-lg ${
            toast.type === 'success'
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
              : 'border-rose-500/30 bg-rose-500/10 text-rose-200'
          }`}
          role="status"
          aria-live="polite"
        >
          {toast.text}
        </div>
      ) : null}
    </section>
  )
}

export default BroadcastEmail