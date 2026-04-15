// ©2026 SMS GATEWAY Mahin Ltd Developed By Tanvir
import { BarChart3, Download, Inbox, LogOut, MessageSquare, Smartphone } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

function Sidebar() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { language, setLanguage, t } = useLanguage()

  const navItems = [
    {
      label: t('sidebar.dashboard'),
      path: '/dashboard',
      icon: BarChart3,
    },
    {
      label: t('sidebar.devices'),
      path: '/devices',
      icon: Smartphone,
    },
    {
      label: t('sidebar.messages'),
      path: '/messages',
      icon: MessageSquare,
    },
    {
      label: t('sidebar.inbox'),
      path: '/inbox',
      icon: Inbox,
    },
    {
      label: t('sidebar.downloadApp'),
      path: '/download',
      icon: Download,
    },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <aside className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-5 shadow-2xl shadow-blue-950/30 backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-white">{t('common.appName')}</h1>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-blue-300">{t('sidebar.controlPanel')}</p>
        </div>

        <div className="flex items-center rounded-lg border border-slate-600 bg-slate-900/70 p-1 text-xs font-semibold text-slate-300">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`rounded-md px-2 py-1 transition ${
              language === 'en' ? 'bg-blue-600 text-white' : 'hover:text-white'
            }`}
          >
            {t('sidebar.en')}
          </button>
          <button
            type="button"
            onClick={() => setLanguage('bn')}
            className={`rounded-md px-2 py-1 transition ${
              language === 'bn' ? 'bg-blue-600 text-white' : 'hover:text-white'
            }`}
          >
            {t('sidebar.bn')}
          </button>
        </div>
      </div>

      <nav className="mt-6 space-y-2">
        {navItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              `flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                  : 'text-slate-300 hover:bg-slate-700'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-600 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
      >
        <LogOut size={15} />
        {t('sidebar.logout')}
      </button>

      <div className="mt-6 border-t border-slate-700 pt-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{t('sidebar.helpSupport')}</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link to="/terms" className="text-slate-300 transition hover:text-blue-300">
            {t('sidebar.terms')}
          </Link>
          <Link to="/privacy" className="text-slate-300 transition hover:text-blue-300">
            {t('sidebar.privacy')}
          </Link>
          <Link to="/contact" className="text-slate-300 transition hover:text-blue-300">
            {t('sidebar.contact')}
          </Link>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
