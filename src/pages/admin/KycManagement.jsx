// ©2026 SMS GATEWAY Mahin Ltd develop by (Tanvir)
import { useEffect, useState } from 'react'
import LoadingSpinner from '../../components/LoadingSpinner'
import api from '../../services/api'

function resolveImageSrc(image) {
  if (!image) {
    return ''
  }

  const value = String(image)
  if (value.startsWith('data:image/')) {
    return value
  }

  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value
  }

  return `data:image/jpeg;base64,${value}`
}

function KycManagement() {
  const [kycRequests, setKycRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState({})
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchPendingKyc = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await api.get('/admin/kyc/pending')
      const payload = response?.data?.data || response?.data || {}
      const list = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.requests)
          ? payload.requests
          : Array.isArray(payload?.kycRequests)
            ? payload.kycRequests
            : Array.isArray(payload?.data)
              ? payload.data
              : []

      setKycRequests(list)
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          requestError?.response?.data?.error ||
          'Failed to load KYC requests.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPendingKyc()
  }, [])

  const handleStatusUpdate = async (userId, status) => {
    if (!userId) {
      return
    }

    const key = `${userId}-${status}`
    setActionLoading((previous) => ({ ...previous, [key]: true }))
    setError('')
    setSuccess('')

    try {
      await api.put(`/admin/kyc/${userId}/status`, { status })
      setKycRequests((previous) => previous.filter((request) => String(request?._id || request?.id || request?.userId) !== String(userId)))
      setSuccess(`KYC request ${status} successfully.`)
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          requestError?.response?.data?.error ||
          'Could not update KYC status.',
      )
    } finally {
      setActionLoading((previous) => ({ ...previous, [key]: false }))
    }
  }

  return (
    <>
      <header className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.2em] text-blue-300">KYC Review</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">KYC Requests</h2>
        <p className="mt-2 text-slate-300">Review pending identity verification documents submitted by users.</p>
      </header>

      <section className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-5 shadow-xl shadow-blue-950/20 backdrop-blur">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-300">Pending KYC requests from the deployed admin API.</p>
          <button
            type="button"
            onClick={fetchPendingKyc}
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
            Loading KYC requests...
          </div>
        ) : null}

        {!isLoading && kycRequests.length === 0 ? (
          <p className="rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-5 text-sm text-slate-300">
            No pending KYC requests at the moment.
          </p>
        ) : null}

        {!isLoading && kycRequests.length > 0 ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {kycRequests.map((request) => {
              const userId = request?._id || request?.id || request?.userId || request?.user?._id || ''
              const name = request?.name || request?.user?.name || 'Unknown User'
              const email = request?.email || request?.user?.email || 'No email available'
              const nidFront = resolveImageSrc(request?.nidFront || request?.nid_front)
              const nidBack = resolveImageSrc(request?.nidBack || request?.nid_back)
              const selfie = resolveImageSrc(request?.selfie)

              return (
                <article key={String(userId || email)} className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4 shadow-lg shadow-blue-950/10">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.18em] text-blue-300">Applicant</p>
                      <h3 className="mt-1 text-xl font-semibold text-white">{name}</h3>
                      <p className="mt-1 text-sm text-slate-300">{email}</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleStatusUpdate(userId, 'approved')}
                        disabled={!userId || actionLoading[`${userId}-approved`]} 
                        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-emerald-900/60"
                      >
                        {actionLoading[`${userId}-approved`] ? 'Approving...' : 'Approve'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStatusUpdate(userId, 'rejected')}
                        disabled={!userId || actionLoading[`${userId}-rejected`]} 
                        className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:bg-rose-900/60"
                      >
                        {actionLoading[`${userId}-rejected`] ? 'Rejecting...' : 'Reject'}
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    {[
                      { label: 'NID Front', src: nidFront },
                      { label: 'NID Back', src: nidBack },
                      { label: 'Selfie', src: selfie },
                    ].map(({ label, src }) => (
                      <div key={label} className="overflow-hidden rounded-xl border border-slate-700 bg-slate-950/50">
                        <div className="border-b border-slate-700 px-3 py-2 text-xs uppercase tracking-[0.16em] text-slate-400">
                          {label}
                        </div>
                        {src ? (
                          <img src={src} alt={label} className="h-48 w-full object-cover" />
                        ) : (
                          <div className="flex h-48 items-center justify-center text-sm text-slate-400">
                            No image available
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        ) : null}
      </section>
    </>
  )
}

export default KycManagement