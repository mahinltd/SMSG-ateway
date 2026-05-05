// ©2026 SMS GATEWAY Mahin Ltd develop by (Tanvir)
import { useEffect, useState } from 'react'
import { CheckCircle2, Clock3 } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import Sidebar from '../components/Sidebar'
import api from '../services/api'

function KycVerification() {
  const [status, setStatus] = useState('loading')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [form, setForm] = useState({
    nidFront: '',
    nidBack: '',
    selfie: '',
  })
  const [previewNames, setPreviewNames] = useState({
    nidFront: '',
    nidBack: '',
    selfie: '',
  })

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result || ''))
      reader.onerror = () => reject(new Error('Could not read file.'))
      reader.readAsDataURL(file)
    })

  const fetchKycStatus = async () => {
    setIsLoading(true)
    setError('')

    try {
      const response = await api.get('/kyc/status')
      const payload = response?.data?.data || response?.data || {}
      const kycStatus = String(payload?.user?.kycStatus || payload?.kycStatus || '').toLowerCase()

      if (['pending', 'approved'].includes(kycStatus)) {
        setStatus(kycStatus)
      } else {
        setStatus('unverified')
      }
    } catch (requestError) {
      setStatus('unverified')
      setError(
        requestError?.response?.data?.message ||
          requestError?.response?.data?.error ||
          'Could not load KYC status. Please try again.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchKycStatus()
  }, [])

  const handleFileChange = async (event) => {
    const { name, files } = event.target
    const file = files?.[0]

    if (!file) {
      return
    }

    try {
      const base64 = await toBase64(file)
      setForm((previous) => ({
        ...previous,
        [name]: base64,
      }))
      setPreviewNames((previous) => ({
        ...previous,
        [name]: file.name,
      }))
    } catch {
      setError('Could not process the selected image. Please try another file.')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')
    setSuccess('')

    try {
      await api.post('/kyc/submit', {
        nidFront: form.nidFront,
        nidBack: form.nidBack,
        selfie: form.selfie,
      })

      setSuccess('KYC documents submitted successfully.')
      setStatus('pending')
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          requestError?.response?.data?.error ||
          'KYC submission failed. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const statusMeta = {
    pending: {
      title: 'Verification Pending!',
      description: 'Your documents are currently under review by the admin. Please wait for approval.',
      badge: 'border-amber-500/30 bg-amber-500/10 text-amber-200',
      icon: Clock3,
    },
    approved: {
      title: 'Verification Successful!',
      description: 'Your KYC is Approved. You can now use all features of the SMS Gateway.',
      badge: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
      icon: CheckCircle2,
    },
  }

  const activeStatus = statusMeta[status]
  const showForm = ['form', 'unverified'].includes(status)

  return (
    <main className="min-h-screen px-4 py-6 md:px-6">
      <div className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-[260px_1fr]">
        <Sidebar />

        <section className="space-y-4">
          <header className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Verification</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">KYC Verification</h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              Upload your NID and selfie to complete account verification.
            </p>
          </header>

          {isLoading ? (
            <div className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
              <div className="flex items-center gap-2 text-slate-300">
                <LoadingSpinner />
                Checking KYC status...
              </div>
            </div>
          ) : null}

          {!isLoading && status === 'approved' && activeStatus ? (
            <article className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 shadow-xl shadow-emerald-950/20 backdrop-blur">
              <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${activeStatus.badge}`}>
                <activeStatus.icon size={14} />
                Approved
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-emerald-100">{activeStatus.title}</h3>
              <p className="mt-2 max-w-2xl text-emerald-50/90">{activeStatus.description}</p>
            </article>
          ) : null}

          {!isLoading && status === 'pending' && activeStatus ? (
            <article className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 shadow-xl shadow-amber-950/20 backdrop-blur">
              <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${activeStatus.badge}`}>
                <activeStatus.icon size={14} />
                Pending
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-amber-100">{activeStatus.title}</h3>
              <p className="mt-2 max-w-2xl text-amber-50/90">{activeStatus.description}</p>
            </article>
          ) : null}

          {!isLoading && showForm ? (
            <article className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
              <h3 className="text-lg font-semibold text-white">Submit KYC Documents</h3>
              <p className="mt-2 text-sm text-slate-300">
                Select clear images of your NID front/back and a selfie. Images are converted to Base64 before submission.
              </p>

              {error ? (
                <p className="mt-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
                  {error}
                </p>
              ) : null}

              {success ? (
                <p className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
                  {success}
                </p>
              ) : null}

              <form className="mt-5 space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { key: 'nidFront', label: 'NID Front' },
                    { key: 'nidBack', label: 'NID Back' },
                    { key: 'selfie', label: 'Selfie (Your Photo)' },
                  ].map(({ key, label }) => (
                    <div key={key} className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                      <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor={key}>
                        {label}
                      </label>
                      <input
                        id={key}
                        name={key}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none transition file:mr-3 file:rounded-md file:border-0 file:bg-blue-600 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:border-blue-500"
                        required
                      />
                      <p className="mt-2 text-xs text-slate-400">
                        {previewNames[key] ? `Selected: ${previewNames[key]}` : 'No file selected'}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-900"
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner />
                      Submitting...
                    </>
                  ) : (
                    'Submit KYC'
                  )}
                </button>
              </form>
            </article>
          ) : null}
        </section>
      </div>
    </main>
  )
}

export default KycVerification