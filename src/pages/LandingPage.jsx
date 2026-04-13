// ©2026 SMS GATEWAY Mahin Ltd Developed By Tanvir
import { ArrowRight, BarChart3, CheckCircle2, Download, Network, QrCode, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import SiteFooter from '../components/SiteFooter'

const features = [
  {
    title: 'Real-time sync',
    description: 'Keep the dashboard and Android client aligned with live status updates.',
    icon: Sparkles,
  },
  {
    title: 'Multi-part SMS support',
    description: 'Handle long messages with a polished experience for outgoing campaigns.',
    icon: Network,
  },
  {
    title: 'Analytics overview',
    description: 'Track active devices, messages, and platform activity from one place.',
    icon: BarChart3,
  },
  {
    title: 'Secure pairing',
    description: 'Use QR-based connection flow to attach devices safely and quickly.',
    icon: QrCode,
  },
  {
    title: 'Operational clarity',
    description: 'Keep your team focused with a clean, modern SaaS workspace.',
    icon: ShieldCheck,
  },
]

const steps = [
  {
    title: 'Step 1. Download the app',
    description: 'Install the Android client from the Download App page to begin setup.',
  },
  {
    title: 'Step 2. Scan QR to connect',
    description: 'Pair the phone with your account by scanning the QR code in the dashboard.',
  },
  {
    title: 'Step 3. Start sending SMS',
    description: 'Create messages, monitor delivery, and manage your gateway in real time.',
  },
]

function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#0f172a_55%,_#111827_100%)] px-4 py-6 text-white md:px-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 rounded-[2rem] border border-slate-700/70 bg-slate-900/70 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur md:p-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-blue-300">
              Mahin Ltd SMS Gateway
            </div>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              A modern SMS Gateway platform for connected operations.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              Manage Android device pairing, real-time message delivery, and daily workflows from one
              polished SaaS dashboard built for speed and clarity.
            </p>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-[1.15fr_0.85fr] md:items-stretch">
          <div className="rounded-[1.75rem] border border-slate-700/80 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Welcome</p>
            <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">Send, connect, and scale with confidence.</h2>
            <p className="mt-4 max-w-xl text-slate-300">
              Use the dashboard to connect devices, manage messages, and keep your SMS workflow organized.
              Start by signing in or creating an account.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Login
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800/60 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-blue-500 hover:text-white"
              >
                Register
              </Link>
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-slate-700/80 bg-slate-800/80 p-6 shadow-lg shadow-blue-950/20 md:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-300">At a glance</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Built for a clear SaaS workflow.</h2>
            <div className="mt-6 space-y-4">
              {[
                'Real-time sync between your dashboard and Android client.',
                'QR-based pairing that keeps setup quick and secure.',
                'An Android download flow ready for production deployment.',
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-300">
                    <CheckCircle2 size={16} />
                  </span>
                  <p className="text-sm leading-6 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-[1.75rem] border border-slate-700/80 bg-slate-800/80 p-6 shadow-lg shadow-blue-950/20 md:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-300">How it works</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Simple setup in three steps.</h2>
            <div className="mt-6 space-y-4">
              {steps.map((step) => (
                <div key={step.title} className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-300">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{step.description}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-slate-700/80 bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Download Android App</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Get the mobile client for pairing and sending SMS.</h2>
            <p className="mt-4 text-slate-300">
              Use the official Android app to connect your device, scan the pairing code, and keep your
              messaging workflow moving from anywhere.
            </p>

            <a
              href="/download"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              <Download size={16} />
              Download Android App
            </a>
          </article>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-[1.5rem] border border-slate-700/80 bg-slate-800/80 p-5 shadow-lg shadow-blue-950/20"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
            </article>
          ))}
        </section>

        <SiteFooter />
      </div>
    </main>
  )
}

export default LandingPage
