// ©2026 SMS GATEWAY Mahin Ltd Developed By Tanvir
import { useEffect, useMemo, useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import api from '../services/api'

function normalizePayments(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.payments)) {
    return payload.payments
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  return []
}

function resolvePaymentId(payment) {
  return payment?._id || payment?.id || payment?.paymentId || ''
}

function resolveStatus(payment) {
  return String(payment?.status || payment?.paymentStatus || '').trim().toLowerCase() || 'unknown'
}

function resolveUserName(payment) {
  return (
    payment?.user?.name ||
    payment?.name ||
    payment?.userName ||
    payment?.fullName ||
    'Unknown User'
  )
}

function resolvePhone(payment) {
  return payment?.phone || payment?.phoneNumber || payment?.mobile || payment?.user?.phone || '-'
}

function resolveTrxId(payment) {
  return payment?.trxId || payment?.trxID || payment?.transactionId || '-'
}

function resolveMethod(payment) {
  return payment?.method || payment?.paymentMethod || payment?.gateway || '-'
}

function resolveAmount(payment) {
  const amount = payment?.amount ?? payment?.total ?? payment?.price
  return amount === undefined || amount === null ? '-' : amount
}

function badgeClass(status) {
  if (status === 'approved' || status === 'paid' || status === 'success') {
    return 'border-emerald-500/30 bg-emerald-500/15 text-emerald-300'
  }

  if (status === 'rejected' || status === 'failed' || status === 'cancelled') {
    return 'border-rose-500/30 bg-rose-500/15 text-rose-300'
  }

  return 'border-amber-500/30 bg-amber-500/15 text-amber-300'
}

function AdminPayments() {
  const [payments, setPayments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState({})

  const pendingCount = useMemo(
    () => payments.filter((payment) => resolveStatus(payment) === 'pending').length,
    [payments],
  )

  const fetchPayments = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await api.get('/admin/payments')
      setPayments(normalizePayments(response?.data?.data || response?.data))
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          requestError?.response?.data?.error ||
          'Failed to load payments.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPayments()
  }, [])

  const updatePaymentStatus = async (paymentId, status) => {
    const key = `${paymentId}-${status}`
    setActionLoading((previous) => ({ ...previous, [key]: true }))

    try {
      await api.put(`/admin/payments/${paymentId}/status`, { status })

      setPayments((previous) =>
        previous.map((payment) => {
          if (String(resolvePaymentId(payment)) !== String(paymentId)) {
            return payment
          }

          return {
            ...payment,
            status,
          }
        }),
      )
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          requestError?.response?.data?.error ||
          'Could not update payment status.',
      )
    } finally {
      setActionLoading((previous) => ({ ...previous, [key]: false }))
    }
  }

  return (
    <>
      <header className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Payments</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Payment Management</h2>
        <p className="mt-2 text-slate-300">Review submissions and approve or reject pending transactions.</p>

        <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-sm text-amber-200">
          Pending: {pendingCount}
        </div>
      </header>

      <section className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-5 shadow-xl shadow-blue-950/20 backdrop-blur">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-300">All payments are fetched from the deployed admin API.</p>
          <button
            type="button"
            onClick={fetchPayments}
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

        {isLoading ? (
          <div className="flex items-center gap-2 py-8 text-slate-300">
            <LoadingSpinner />
            Loading payments...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700 text-left text-sm">
              <thead className="bg-slate-900/60 text-xs uppercase tracking-[0.16em] text-slate-400">
                <tr>
                  <th className="px-4 py-3">User Name</th>
                  <th className="px-4 py-3">Phone Number</th>
                  <th className="px-4 py-3">TrxID</th>
                  <th className="px-4 py-3">Payment Method</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {payments.length === 0 ? (
                  <tr>
                    <td className="px-4 py-5 text-slate-300" colSpan={7}>
                      No payments found.
                    </td>
                  </tr>
                ) : (
                  payments.map((payment) => {
                    const id = resolvePaymentId(payment)
                    const status = resolveStatus(payment)
                    const approveKey = `${id}-approved`
                    const rejectKey = `${id}-rejected`
                    const isPending = status === 'pending'

                    return (
                      <tr key={id || `${resolveTrxId(payment)}-${resolveUserName(payment)}`}>
                        <td className="px-4 py-4 text-slate-100">{resolveUserName(payment)}</td>
                        <td className="px-4 py-4 text-slate-300">{resolvePhone(payment)}</td>
                        <td className="px-4 py-4 text-slate-300">{resolveTrxId(payment)}</td>
                        <td className="px-4 py-4 text-slate-300">{resolveMethod(payment)}</td>
                        <td className="px-4 py-4 text-slate-100">{resolveAmount(payment)}</td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${badgeClass(
                              status,
                            )}`}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              disabled={!isPending || actionLoading[approveKey] || actionLoading[rejectKey]}
                              onClick={() => updatePaymentStatus(id, 'approved')}
                              className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-emerald-900/60"
                            >
                              {actionLoading[approveKey] ? 'Approving...' : 'Approve'}
                            </button>
                            <button
                              type="button"
                              disabled={!isPending || actionLoading[approveKey] || actionLoading[rejectKey]}
                              onClick={() => updatePaymentStatus(id, 'rejected')}
                              className="rounded-md bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:bg-rose-900/60"
                            >
                              {actionLoading[rejectKey] ? 'Rejecting...' : 'Reject'}
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

export default AdminPayments
