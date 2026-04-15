// ©2026 SMS GATEWAY Mahin Ltd Developed By Tanvir
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function parseTokenPayload(token) {
  try {
    const payload = String(token || '').split('.')[1]

    if (!payload || typeof window === 'undefined') {
      return null
    }

    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
    const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4)

    return JSON.parse(window.atob(padded))
  } catch {
    return null
  }
}

function resolveRole(payload) {
  const role = payload?.user?.role || payload?.role || payload?.userRole || payload?.accountType
  return typeof role === 'string' ? role.toLowerCase().trim() : ''
}

function AdminRoute({ children }) {
  const { token, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  const payload = parseTokenPayload(token)
  const resolvedRole = resolveRole(payload)

  console.log('Decoded Token Payload:', payload)
  console.log('Resolved Role:', resolvedRole)

  if (resolvedRole !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoute
