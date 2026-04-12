// ©2026 SMS GATEWAY Mahin Ltd develop by (Tanvir)
import { Link } from 'react-router-dom'

function TermsPage() {
  return (
    <main className="min-h-screen px-4 py-8 md:px-6 md:py-10">
      <section className="mx-auto w-full max-w-4xl rounded-3xl border border-slate-700/80 bg-slate-800/90 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur md:p-10">
        <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Legal</p>
        <h1 className="mt-2 text-3xl font-semibold text-white md:text-4xl">Terms &amp; Conditions</h1>
        <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base md:leading-8">
          These Terms and Conditions are provided as a professional placeholder for the SMS Gateway
          website. They describe the general rules for using this platform, accessing content,
          maintaining account security, and respecting applicable laws and regulations.
        </p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-300 md:text-base md:leading-8">
          <section>
            <h2 className="text-lg font-semibold text-white">1. Acceptance of Terms</h2>
            <p className="mt-2">
              By using this website, you agree to comply with the terms of service, acceptable use
              expectations, and all related policies published by SMS Gateway.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">2. Account Responsibilities</h2>
            <p className="mt-2">
              You are responsible for maintaining the confidentiality of your login credentials and
              for all activity performed under your account.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">3. Service Usage</h2>
            <p className="mt-2">
              You agree not to misuse the dashboard, attempt unauthorized access, or use the
              service in any way that violates law or disrupts service availability.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">4. Updates</h2>
            <p className="mt-2">
              These terms may be updated periodically. Continued use of the platform after changes
              means you accept the revised terms.
            </p>
          </section>
        </div>

        <div className="mt-10 flex flex-wrap gap-3 border-t border-slate-700 pt-6">
          <Link to="/contact" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500">
            Contact Us
          </Link>
          <Link to="/privacy" className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700">
            Privacy Policy
          </Link>
        </div>
      </section>
    </main>
  )
}

export default TermsPage
