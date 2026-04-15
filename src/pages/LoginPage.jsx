// ©2026 SMS GATEWAY Mahin Ltd Developed By Tanvir
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import SiteFooter from '../components/SiteFooter'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { loginUser } from '../services/authService'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { t } = useLanguage()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const data = await loginUser(form)
      const token = data?.token || data?.accessToken

      if (!token) {
        throw new Error('Token not returned by API')
      }

      login(token)
      navigate('/dashboard', { replace: true })
    } catch (submitError) {
      setError(
        submitError?.response?.data?.message ||
          submitError.message ||
          t('login.loginFailed'),
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto flex w-full max-w-md flex-col">
        <div className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-7 shadow-2xl shadow-blue-950/30 backdrop-blur">
        <div className="mb-1 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-blue-300">
          {t('login.badge')}
        </div>
        <h1 className="text-2xl font-semibold text-white">{t('login.title')}</h1>
        <p className="mt-2 text-sm text-slate-300">{t('login.subtitle')}</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm text-slate-200" htmlFor="email">
              {t('login.email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-200" htmlFor="password">
              {t('login.password')}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          {error ? (
            <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
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
                {t('login.signingIn')}
              </>
            ) : (
              t('login.signIn')
            )}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-300">
          {t('login.noAccount')}{' '}
          <Link to="/register" className="font-medium text-blue-400 hover:text-blue-300">
            {t('login.createOne')}
          </Link>
        </p>

        </div>

        <SiteFooter />
      </div>
    </main>
  )
}

export default LoginPage
