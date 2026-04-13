// ©2026 SMS GATEWAY Mahin Ltd Developed By Tanvir
import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'
import LandingPage from './pages/LandingPage'
import DownloadPage from './pages/DownloadPage'
import DashboardPage from './pages/DashboardPage'
import DevicesPage from './pages/DevicesPage'
import ContactPage from './pages/ContactPage'
import InboxPage from './pages/InboxPage'
import LoginPage from './pages/LoginPage'
import MessagesPage from './pages/MessagesPage'
import PrivacyPage from './pages/PrivacyPage'
import RegisterPage from './pages/RegisterPage'
import TermsPage from './pages/TermsPage'

function RedirectIfAuthenticated({ children }) {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

function HomeRoute() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <LandingPage />
}

function DocumentTitleManager() {
  const location = useLocation()

  useEffect(() => {
    const pathToTitle = {
      '/': 'Home',
      '/login': 'Login',
      '/register': 'Register',
      '/dashboard': 'Dashboard',
      '/devices': 'Devices',
      '/messages': 'Messages',
      '/inbox': 'Inbox',
      '/download': 'Download',
      '/terms': 'Terms',
      '/privacy': 'Privacy',
      '/contact': 'Contact',
    }

    const pageTitle = pathToTitle[location.pathname] || 'SMS Gateway'

    document.title = `${pageTitle} | SMS Gateway`
  }, [location.pathname])

  return null
}

function App() {
  return (
    <>
      <DocumentTitleManager />
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <LoginPage />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectIfAuthenticated>
              <RegisterPage />
            </RedirectIfAuthenticated>
          }
        />

        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/devices"
          element={
            <ProtectedRoute>
              <DevicesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <InboxPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/download"
          element={
            <ProtectedRoute>
              <DownloadPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
