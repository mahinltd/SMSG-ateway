// ©2026 SMS GATEWAY Mahin Ltd develop by (Tanvir)
function AboutPage() {
  return (
    <main className="min-h-screen px-4 py-8 md:px-6">
      <section className="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-700/80 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 shadow-2xl shadow-blue-950/30 backdrop-blur">
        <div className="border-b border-white/10 px-6 py-8 md:px-10 md:py-12">
          <p className="text-sm uppercase tracking-[0.28em] text-blue-300">About Mahin Ltd</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">
            Mahin AI SMS Gateway
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
            Mahin Ltd is a forward-thinking technology company based in Bangladesh, specializing in scalable
            communication solutions. Our flagship product, Mahin AI SMS Gateway, empowers businesses to transform
            their Android devices into robust, real-time SMS delivery systems.
          </p>
        </div>

        <div className="grid gap-6 px-6 py-8 md:grid-cols-2 md:px-10 md:py-12">
          <article className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-blue-300">What we build</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Reliable communication infrastructure</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              We focus on performance, transparency, and automation for teams that need dependable messaging across
              Android devices, dashboards, and live operations.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-blue-300">Why it matters</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Built for speed and control</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Mahin AI SMS Gateway is designed to help organizations route messages in real time with clarity,
              operational control, and a smooth user experience.
            </p>
          </article>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Mahin Ltd',
              url: 'https://sms.mahinai.app',
              logo: 'https://sms.mahinai.app/logo.png',
              description: 'Provider of Mahin AI SMS Gateway, a modern solution for background SMS routing.',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'BD, USA,UK, ALL CUNTREY',
              },
            }),
          }}
        />
      </section>
    </main>
  )
}

export default AboutPage