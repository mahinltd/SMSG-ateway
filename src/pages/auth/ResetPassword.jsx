// ©2026 SMS GATEWAY Mahin Ltd develop by (Tanvir)
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import LoadingSpinner from '../../components/LoadingSpinner'
import api from '../../services/api'

function ResetPassword() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [newPassword, setNewPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!token) {
      setError('Invalid or missing password reset token in the URL.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      await api.post('/auth/reset-password', {
        token,
        newPassword,
      })

      navigate('/login', { replace: true })
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          requestError?.response?.data?.error ||
          'Could not reset password. Please try again.',
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
          <h1 className="mt-2 text-2xl font-semibold text-white">Reset Password</h1>
          <p className="mt-2 text-sm text-slate-300">Create a new password to regain access.</p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-sm text-slate-200" htmlFor="newPassword">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                autoComplete="new-password"
                required
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500"
              />
            </div>

            {error ? (
              <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={isLoading || !token}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-900"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default ResetPassword