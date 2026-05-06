// ©2026 SMS GATEWAY Mahin Ltd develop by (Tanvir)
import { AlertTriangle, ArrowRight, Download, LogIn } from 'lucide-react'
import { Link } from 'react-router-dom'
import SiteFooter from '../components/SiteFooter'

function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#0f172a_55%,_#111827_100%)] px-4 py-6 text-white md:px-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 rounded-[2rem] border border-slate-700/70 bg-slate-900/70 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur md:p-10">
        {/* HERO SECTION */}
        <header className="text-center">
          <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-blue-300">
            Enterprise SMS Solution
          </div>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-white md:text-6xl">
            Mahin AI SMS Gateway
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-slate-300 md:text-xl">
            Transform your Android device into a powerful bulk SMS routing server. Send messages securely using your own SIM card.
          </p>
        </header>

        {/* CTA BUTTONS */}
        <div className="flex flex-col gap-4 md:flex-row md:justify-center md:items-center">
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white transition hover:bg-blue-500"
          >
            <LogIn size={18} />
            Login to Dashboard
          </Link>
          <Link
            to="/download"
            className="flex items-center justify-center gap-2 rounded-lg border border-blue-500 bg-transparent px-8 py-3 text-lg font-semibold text-blue-300 transition hover:bg-blue-500/10"
          >
            <Download size={18} />
            Download Android App
          </Link>
        </div>

        {/* COMPANY INFO */}
        <section className="mt-6 rounded-xl border border-slate-700 bg-slate-900/70 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Powered By</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Mahin Ltd (mahinltd.tech)</h3>
          <p className="mt-3 max-w-2xl text-slate-300">
            A trusted technology company based in Bangladesh, specializing in scalable communication solutions and modern SaaS platforms.
          </p>
        </section>

        {/* AI DISCLAIMER */}
        <section className="rounded-xl border-2 border-amber-500/30 bg-amber-500/10 p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-1 flex-shrink-0 text-amber-400" size={20} />
            <div>
              <h3 className="text-lg font-semibold text-amber-300">Important: What We Are & Aren't</h3>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                <strong>Disclaimer:</strong> Mahin AI SMS Gateway is a B2B software tool for routing legitimate SMS via personal devices. We are <strong>NOT</strong> a virtual number provider, temporary SMS service, or OTP receiving platform. We prioritize privacy and strictly comply with local telecom regulations. By using our service, you agree to use it only for lawful business communications and to respect all applicable carrier policies and anti-spam laws.
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES OVERVIEW */}
        <section className="mt-8">
          <h2 className="text-center text-3xl font-bold text-white mb-8">Why Choose Mahin AI SMS Gateway?</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
              <h3 className="text-lg font-semibold text-white">📱 Your Own Device</h3>
              <p className="mt-2 text-sm text-slate-300">Use your Android phone and personal SIM card for maximum control and authenticity.</p>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
              <h3 className="text-lg font-semibold text-white">🔒 Privacy First</h3>
              <p className="mt-2 text-sm text-slate-300">We never access your inbox. Messages are processed securely between your device and dashboard.</p>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
              <h3 className="text-lg font-semibold text-white">⚡ Real-Time Delivery</h3>
              <p className="mt-2 text-sm text-slate-300">Send bulk messages instantly with live status tracking and delivery reports.</p>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
              <h3 className="text-lg font-semibold text-white">📊 Full Dashboard</h3>
              <p className="mt-2 text-sm text-slate-300">Monitor all messages, manage devices, and view analytics in one place.</p>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
              <h3 className="text-lg font-semibold text-white">🌐 Web & Mobile</h3>
              <p className="mt-2 text-sm text-slate-300">Access your SMS gateway from any web browser or Android device.</p>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
              <h3 className="text-lg font-semibold text-white">✅ Compliant</h3>
              <p className="mt-2 text-sm text-slate-300">Built with telecom regulations in mind. Your responsibility to use lawfully.</p>
            </div>
          </div>
        </section>

        {/* QUICK START */}
        <section className="mt-8">
          <h2 className="text-center text-3xl font-bold text-white mb-8">Get Started in 3 Steps</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">1</div>
              <h3 className="mt-4 text-lg font-semibold text-white">Sign Up</h3>
              <p className="mt-2 text-sm text-slate-300">Create your account and access the dashboard.</p>
            </div>
            <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">2</div>
              <h3 className="mt-4 text-lg font-semibold text-white">Connect Device</h3>
              <p className="mt-2 text-sm text-slate-300">Download the Android app and link your phone.</p>
            </div>
            <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">3</div>
              <h3 className="mt-4 text-lg font-semibold text-white">Send SMS</h3>
              <p className="mt-2 text-sm text-slate-300">Start sending bulk messages securely.</p>
            </div>
          </div>
        </section>

        {/* FOOTER CTA */}
        <section className="mt-8 text-center">
          <p className="mb-4 text-slate-300">Ready to get started?</p>
          <div className="flex flex-col gap-3 md:flex-row md:justify-center">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              <ArrowRight size={18} />
              Login Now
            </Link>
            <Link
              to="/about"
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-600 px-8 py-3 font-semibold text-slate-300 transition hover:bg-slate-700"
            >
              Learn More
            </Link>
          </div>
        </section>

      </div>
      <SiteFooter />
    </main>
  )
}

export default LandingPage
