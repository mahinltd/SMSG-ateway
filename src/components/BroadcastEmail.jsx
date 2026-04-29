// ©2026 SMS GATEWAY Mahin Ltd Developed By Tanvir
import { useEffect, useMemo, useState } from 'react'
import Skeleton from './ui/Skeleton'
import api from '../services/api'

function isEmail(value) {
  return /@/.test(String(value || '').trim())
}

function BroadcastEmail() {
  const [recipient, setRecipient] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (!toast) return undefined

    const timer = window.setTimeout(() => setToast(null), 3500)
    return () => window.clearTimeout(timer)
  }, [toast])

  const recipientPayload = useMemo(() => {
    const value = recipient.trim()
    if (!value) return {}
    return isEmail(value) ? { email: value } : { userId: value }
  }, [recipient])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSending(true)
    setToast(null)

    try {
      await api.post('/admin/emails/send', {
        ...recipientPayload,
        subject: subject.trim(),
        message: message.trim(),
      })

      setToast({ type: 'success', text: 'Email sent successfully.' })
      setRecipient('')
      setSubject('')
      setMessage('')
    } catch (requestError) {
      setToast({
        type: 'error',
        text:
          requestError?.response?.data?.message ||
          requestError?.response?.data?.error ||
          'User not found.',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
      <div className="mb-5">
        <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Email</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">Send Individual Email</h3>
        <p className="mt-2 text-sm text-slate-300">
          Send a professional one-to-one email to a user by user ID or email address.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 block text-sm text-slate-200" htmlFor="recipient">
            User ID or Email
          </label>
          <input
            id="recipient"
            type="text"
            value={recipient}
            onChange={(event) => setRecipient(event.target.value)}
            placeholder="USER_ID_HERE or user@example.com"
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-200" htmlFor="subject">
            Email Subject
          </label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            placeholder="Account Update"
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-200" htmlFor="message">
            Email Message (HTML allowed)
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={7}
            placeholder="<p>Hello, your account is now active.</p>"
            className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSending}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-900"
        >
          {isSending ? (
            <>
              <Skeleton width="4rem" height={12} className="bg-blue-400/30" />
              Sending...
            </>
          ) : (
            'Send Email'
          )}
        </button>
      </form>

      {isSending ? (
        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
          <div className="space-y-3">
            <Skeleton width="40%" height={12} />
            <Skeleton width="100%" height={44} />
            <Skeleton width="75%" height={44} />
          </div>
        </div>
      ) : null}

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