// ©2026 SMS GATEWAY Mahin Ltd Developed By Tanvir
import { useEffect, useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import api from '../services/api'

function normalizeUsers(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.users)) {
    return payload.users
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  return []
}

function resolveUserId(user) {
  return user?._id || user?.id || user?.userId || ''
}

function resolveName(user) {
  return user?.name || user?.fullName || 'Unknown User'
}

function resolveEmail(user) {
  return user?.email || user?.mail || '-'
}

function resolvePaid(user) {
  return Boolean(user?.isPaid ?? user?.paid ?? user?.hasPaid)
}

function resolveBanned(user) {
  return Boolean(user?.isBanned ?? user?.banned)
}

function AdminUsers() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [actionLoading, setActionLoading] = useState({})

  const fetchUsers = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await api.get('/admin/users')
      setUsers(normalizeUsers(response?.data?.data || response?.data))
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          requestError?.response?.data?.error ||
          'Failed to load users.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleBanToggle = async (user) => {
    const userId = resolveUserId(user)
    const isBanned = resolveBanned(user)
    const nextBannedState = !isBanned
    const key = `${userId}-ban-toggle`

    setActionLoading((previous) => ({ ...previous, [key]: true }))
    setError('')
    setSuccess('')

    try {
      await api.put(`/admin/users/${userId}/ban`, { isBanned: nextBannedState })

      setUsers((previous) =>
        previous.map((item) => {
          if (String(resolveUserId(item)) !== String(userId)) {
            return item
          }

          return {
            ...item,
            isBanned: nextBannedState,
          }
        }),
      )

      setSuccess(nextBannedState ? 'User has been banned.' : 'User has been unbanned.')
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          requestError?.response?.data?.error ||
          'Could not update ban status.',
      )
    } finally {
      setActionLoading((previous) => ({ ...previous, [key]: false }))
    }
  }

  const handleDelete = async (user) => {
    const userId = resolveUserId(user)
    const userName = resolveName(user)
    const key = `${userId}-delete`

    if (typeof window !== 'undefined') {
      const confirmed = window.confirm(`Delete user ${userName} permanently? This action cannot be undone.`)
      if (!confirmed) {
        return
      }
    }

    setActionLoading((previous) => ({ ...previous, [key]: true }))
    setError('')
    setSuccess('')

    try {
      await api.delete(`/admin/users/${userId}`)
      setUsers((previous) => previous.filter((item) => String(resolveUserId(item)) !== String(userId)))
      setSuccess('User deleted permanently.')
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          requestError?.response?.data?.error ||
          'Could not delete user.',
      )
    } finally {
      setActionLoading((previous) => ({ ...previous, [key]: false }))
    }
  }

  return (
    <>
      <header className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Users</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Users Management</h2>
        <p className="mt-2 text-slate-300">Monitor subscription status and manage account access securely.</p>
      </header>

      <section className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-5 shadow-xl shadow-blue-950/20 backdrop-blur">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-300">All users are fetched from the deployed admin API.</p>
          <button
            type="button"
            onClick={fetchUsers}
            disabled={isLoading}
            className="rounded-lg border border-slate-600 px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-700"
          >
            {isLoading ? 'Refreshing...' : 'Refresh'}
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
            Loading users...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700 text-left text-sm">
              <thead className="bg-slate-900/60 text-xs uppercase tracking-[0.16em] text-slate-400">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">isPaid</th>
                  <th className="px-4 py-3">isBanned</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {users.length === 0 ? (
                  <tr>
                    <td className="px-4 py-5 text-slate-300" colSpan={5}>
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => {
                    const userId = resolveUserId(user)
                    const isBanned = resolveBanned(user)
                    const banKey = `${userId}-ban-toggle`
                    const deleteKey = `${userId}-delete`
                    const isRowBusy = Boolean(actionLoading[banKey] || actionLoading[deleteKey])

                    return (
                      <tr key={userId || resolveEmail(user)}>
                        <td className="px-4 py-4 text-slate-100">{resolveName(user)}</td>
                        <td className="px-4 py-4 text-slate-300">{resolveEmail(user)}</td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${
                              resolvePaid(user)
                                ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-300'
                                : 'border-slate-600 bg-slate-700/50 text-slate-300'
                            }`}
                          >
                            {resolvePaid(user) ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${
                              isBanned
                                ? 'border-rose-500/30 bg-rose-500/15 text-rose-300'
                                : 'border-emerald-500/30 bg-emerald-500/15 text-emerald-300'
                            }`}
                          >
                            {isBanned ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              disabled={isRowBusy}
                              onClick={() => handleBanToggle(user)}
                              className="rounded-md bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:bg-amber-900/60"
                            >
                              {actionLoading[banKey]
                                ? isBanned
                                  ? 'Unbanning...'
                                  : 'Banning...'
                                : isBanned
                                  ? 'Unban'
                                  : 'Ban'}
                            </button>
                            <button
                              type="button"
                              disabled={isRowBusy}
                              onClick={() => handleDelete(user)}
                              className="rounded-md bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:bg-rose-900/60"
                            >
                              {actionLoading[deleteKey] ? 'Deleting...' : 'Delete'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  )
}

export default AdminUsers
