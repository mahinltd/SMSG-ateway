// ©2026 SMS GATEWAY Mahin Ltd Developed By Tanvir
import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import AdminRoute from './components/AdminRoute'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'
import { useLanguage } from './context/LanguageContext'
import AdminLayout from './layouts/AdminLayout'
import AdminPayments from './pages/AdminPayments'
import AdminSettings from './pages/AdminSettings'
import AdminUsers from './pages/AdminUsers'
import KycManagement from './pages/admin/KycManagement'
import LandingPage from './pages/LandingPage'
import DownloadPage from './pages/DownloadPage'
import DashboardPage from './pages/DashboardPage'
import DevicesPage from './pages/DevicesPage'
import ContactPage from './pages/ContactPage'
import InboxPage from './pages/InboxPage'
import LoginPage from './pages/LoginPage'
import MessagesPage from './pages/MessagesPage'
import BulkSmsPage from './pages/BulkSmsPage'
import KycVerification from './pages/KycVerification'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import KycGuard from './components/KycGuard'
import PrivacyPage from './pages/PrivacyPage'
import RegisterPage from './pages/RegisterPage'
import TermsPage from './pages/TermsPage'
import DesignPreview from './pages/DesignPreview'

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
  const { t } = useLanguage()

  useEffect(() => {
    let dynamicTitleKey = null

    if (location.pathname === '/admin-dashboard') {
      dynamicTitleKey = 'titles.adminDashboard'
    } else if (location.pathname.startsWith('/admin-dashboard/payments')) {
      dynamicTitleKey = 'titles.adminPayments'
    } else if (location.pathname.startsWith('/admin-dashboard/users')) {
      dynamicTitleKey = 'titles.adminUsers'
    } else if (location.pathname.startsWith('/admin-dashboard/settings')) {
      dynamicTitleKey = 'titles.adminSettings'
    }

    const pathToTitleKey = {
      '/': 'titles.home',
      '/login': 'titles.login',
      '/forgot-password': 'titles.login',
      '/reset-password': 'titles.login',
      '/register': 'titles.register',
      '/dashboard': 'titles.dashboard',
      '/dashboard/kyc': 'titles.kycVerification',
      '/devices': 'titles.devices',
      '/messages': 'titles.messages',
      '/inbox': 'titles.inbox',
      '/download': 'titles.download',
      '/terms': 'titles.terms',
      '/privacy': 'titles.privacy',
      '/contact': 'titles.contact',
    }

    const pageTitle = t(dynamicTitleKey || pathToTitleKey[location.pathname] || 'titles.default')

    document.title = `${pageTitle} | ${t('common.appName')}`
  }, [location.pathname, t])

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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
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
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Navigate to="payments" replace />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Navigate to="kyc" replace />} />
          <Route path="kyc" element={<KycManagement />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/kyc"
          element={
            <ProtectedRoute>
              <KycVerification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/devices"
          element={
            <ProtectedRoute>
              <KycGuard>
                <DevicesPage />
              </KycGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <KycGuard>
                <MessagesPage />
              </KycGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/bulk-sms"
          element={
            <ProtectedRoute>
              <KycGuard>
                <BulkSmsPage />
              </KycGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/design-preview"
          element={<DesignPreview />}
        />
        <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <KycGuard>
                <InboxPage />
              </KycGuard>
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
