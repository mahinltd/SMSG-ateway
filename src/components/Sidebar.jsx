// ©2026 Application or Website Name Mahin Ltd develop by (Tanvir)
import { BarChart3, Inbox, LogOut, MessageSquare, Smartphone } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navItems = [
  {
    label: 'Dashboard',
    path: '/',
    icon: BarChart3,
  },
  {
    label: 'Devices',
    path: '/devices',
    icon: Smartphone,
  },
  {
    label: 'Messages',
    path: '/messages',
    icon: MessageSquare,
  },
  {
    label: 'Inbox',
    path: '/inbox',
    icon: Inbox,
  },
]

function Sidebar() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <aside className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-5 shadow-2xl shadow-blue-950/30 backdrop-blur">
      <h1 className="text-xl font-semibold text-white">SMS Gateway</h1>
      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-blue-300">Control Panel</p>

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
        Logout
      </button>
    </aside>
  )
}

export default Sidebar
