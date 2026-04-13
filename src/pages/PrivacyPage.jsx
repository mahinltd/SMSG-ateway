// ©2026 SMS GATEWAY Mahin Ltd Developed By Tanvir
import { Link } from 'react-router-dom'

function PrivacyPage() {
  return (
    <main className="min-h-screen px-4 py-8 md:px-6 md:py-10">
      <section className="mx-auto w-full max-w-4xl rounded-3xl border border-slate-700/80 bg-slate-800/90 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur md:p-10">
        <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Legal</p>
        <h1 className="mt-2 text-3xl font-semibold text-white md:text-4xl">Privacy Policy</h1>
        <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base md:leading-8">
          This Privacy Policy is a professional placeholder describing how SMS Gateway may collect,
          use, store, and protect user information. Final legal text should be reviewed and updated
          before public release.
        </p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-300 md:text-base md:leading-8">
          <section>
            <h2 className="text-lg font-semibold text-white">Information We Collect</h2>
            <p className="mt-2">
              We may collect account details, device metadata, message history, and technical
              diagnostics required to deliver and improve the service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">How We Use Information</h2>
            <p className="mt-2">
              Information is used to operate the dashboard, synchronize devices, provide support,
              and maintain the security and reliability of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Data Protection</h2>
            <p className="mt-2">
              We apply reasonable administrative and technical safeguards to protect personal data
              and service records from unauthorized access or misuse.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Your Choices</h2>
            <p className="mt-2">
              You may contact our support team regarding data access, corrections, or privacy-related
              questions at any time.
            </p>
          </section>
        </div>

        <div className="mt-10 flex flex-wrap gap-3 border-t border-slate-700 pt-6">
          <Link to="/contact" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500">
            Contact Us
          </Link>
          <Link to="/terms" className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700">
            Terms &amp; Conditions
          </Link>
        </div>
      </section>
    </main>
  )
}

export default PrivacyPage
