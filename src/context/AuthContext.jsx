// ©2026 Application or Website Name Mahin Ltd develop by (Tanvir)
import { createContext, useContext, useMemo, useState } from 'react'

const TOKEN_KEY = 'sms_gateway_token'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))

  const login = (nextToken) => {
    setToken(nextToken)
    localStorage.setItem(TOKEN_KEY, nextToken)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem(TOKEN_KEY)
  }

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
