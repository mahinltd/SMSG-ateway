// ©2026 SMS GATEWAY Mahin Ltd develop by (Tanvir)
import { useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner'
import api from '../../services/api'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      await api.post('/auth/forgot-password', { email: email.trim() })
      setSuccess('If this email exists, a reset link has been sent.')
      setEmail('')
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          requestError?.response?.data?.error ||
          'Could not send reset link. Please try again.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto flex w-full max-w-md flex-col">
        <div className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-7 shadow-2xl shadow-blue-950/30 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Account Recovery</p>
          <h1 className="mt-2 text-2xl font-semibold text-white">Forgot Password</h1>
          <p className="mt-2 text-sm text-slate-300">Enter your email to receive a reset link.</p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-sm text-slate-200" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>

            {error ? (
              <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">{error}</p>
            ) : null}

            {success ? (
              <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
                {success}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-900"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>

            <p className="text-sm text-slate-300">
              Remembered your password?{' '}
              <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300">
                Back to login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  )
}

export default ForgotPassword