// ©2026 SMS GATEWAY Mahin Ltd develop by (Tanvir)
function TermsPage() {
  return (
    <main className="min-h-screen px-4 py-8 md:px-6">
      <section className="mx-auto w-full max-w-5xl rounded-3xl border border-slate-700/80 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 py-8 shadow-2xl shadow-blue-950/30 backdrop-blur md:px-10 md:py-12">
        <p className="text-sm uppercase tracking-[0.28em] text-blue-300">Terms of Service</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">Platform terms and usage rules</h1>

        <div className="mt-6 space-y-6 text-slate-300">
          <p className="text-base leading-8 md:text-lg">
            These terms govern your access to and use of Mahin AI SMS Gateway, including any dashboard, Android client,
            and related services provided by Mahin Ltd.
          </p>

          <article className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
            <h2 className="text-2xl font-semibold text-white">Acceptable use</h2>
            <p className="mt-3 text-sm leading-7">
              You agree to use the service only for lawful business or personal communications, to maintain accurate
              account information, and to protect your login credentials.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
            <h2 className="text-2xl font-semibold text-white">Telecom compliance</h2>
            <p className="mt-3 text-sm leading-7">
              Users must comply with all applicable local, national, and international telecom laws, carrier policies,
              and anti-spam regulations when sending bulk SMS or any other message traffic through the platform.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
            <h2 className="text-2xl font-semibold text-white">Service limits</h2>
            <p className="mt-3 text-sm leading-7">
              Mahin Ltd may suspend or restrict access if usage threatens service stability, violates these terms, or
              appears to involve abuse, fraud, or unlawful activity.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default TermsPage
