// ©2026 SMS GATEWAY Mahin Ltd Developed By Tanvir
import { BadgeCheck, CreditCard, LogOut, Settings, Shield, Users } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const adminLinks = [
  {
    label: 'Users',
    path: '/admin-dashboard/users',
    icon: Users,
  },
  {
    label: 'Payments',
    path: '/admin-dashboard/payments',
    icon: CreditCard,
  },
  {
    label: 'Settings',
    path: '/admin-dashboard/settings',
    icon: Settings,
  },
  {
    label: 'KYC Requests',
    path: '/admin/kyc',
    icon: BadgeCheck,
  },
]

function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <main className="min-h-screen px-4 py-6 md:px-6">
      <div className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-5 shadow-2xl shadow-blue-950/30 backdrop-blur">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
            <Shield size={14} />
            Admin Panel
          </div>
          <h1 className="mt-4 text-xl font-semibold text-white">SMS Gateway Admin</h1>
          <p className="mt-1 text-sm text-slate-300">Manage platform users, payments, and configuration.</p>

          <nav className="mt-6 space-y-2">
            {adminLinks.map(({ label, path, icon }) => {
              const NavIcon = icon

              return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`
                  }
                >
                  <NavIcon size={16} />
                  {label}
                </NavLink>
              )
            })}
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

        <section className="space-y-4">
          <Outlet />
        </section>
      </div>
    </main>
  )
}

export default AdminLayout
