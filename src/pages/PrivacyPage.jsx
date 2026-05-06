// ©2026 SMS GATEWAY Mahin Ltd develop by (Tanvir)
function PrivacyPage() {
  return (
    <main className="min-h-screen px-4 py-8 md:px-6">
      <section className="mx-auto w-full max-w-5xl rounded-3xl border border-slate-700/80 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 py-8 shadow-2xl shadow-blue-950/30 backdrop-blur md:px-10 md:py-12">
        <p className="text-sm uppercase tracking-[0.28em] text-blue-300">Privacy Policy</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">
          Privacy and data protection
        </h1>
        <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300 md:text-lg">
          At Mahin Ltd, your privacy is our priority. The Mahin AI SMS Gateway Android Application requires 'SEND_SMS'
          and 'Background Processing' permissions strictly to function as a personal SMS routing gateway for your own
          messages. We NEVER read your personal inbox, nor do we sell or share your data with third parties. All
          communications are securely synced between your dashboard and your device.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
            <h2 className="text-2xl font-semibold text-white">Permissions we use</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              We only request permissions required to route messages from your own Android device and keep the gateway
              connected in the background.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
            <h2 className="text-2xl font-semibold text-white">How data is handled</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Messages and sync data are handled to support your dashboard workflow and are not sold, shared, or read
              for unrelated purposes.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default PrivacyPage
