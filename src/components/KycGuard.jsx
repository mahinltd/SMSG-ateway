// ©2026 SMS GATEWAY Mahin Ltd develop by (Tanvir)
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'
import api from '../services/api'

function KycGuard({ children }) {
  const [kycStatus, setKycStatus] = useState('loading')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchKycStatus = async () => {
      try {
        const response = await api.get('/kyc/status')
        const payload = response?.data?.data || response?.data || {}
        const nextStatus = String(payload?.user?.kycStatus || payload?.kycStatus || '').toLowerCase()

        if (isMounted) {
          setKycStatus(nextStatus || 'unverified')
        }
      } catch {
        if (isMounted) {
          setKycStatus('unverified')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchKycStatus()

    return () => {
      isMounted = false
    }
  }, [])

  if (isLoading) {
    return (
      <main className="min-h-screen px-4 py-6 md:px-6">
        <div className="mx-auto flex min-h-[60vh] w-full max-w-7xl items-center justify-center rounded-2xl border border-slate-700/80 bg-slate-800/90 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
          <div className="flex items-center gap-2 text-slate-300">
            <LoadingSpinner />
            Checking KYC access...
          </div>
        </div>
      </main>
    )
  }

  if (kycStatus === 'approved') {
    return children
  }

  if (['unverified', 'pending', 'rejected', ''].includes(kycStatus)) {
    return <Navigate to="/dashboard/kyc" replace />
  }

  return <Navigate to="/dashboard/kyc" replace />
}

export default KycGuard