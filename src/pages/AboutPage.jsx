// ©2026 SMS GATEWAY Mahin Ltd develop by (Tanvir)
import { useLanguage } from '../context/LanguageContext'

function AboutPage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen px-4 py-8 md:px-6">
      <section className="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-700/80 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 shadow-2xl shadow-blue-950/30 backdrop-blur">
        <div className="border-b border-white/10 px-6 py-8 md:px-10 md:py-12">
          <p className="text-sm uppercase tracking-[0.28em] text-blue-300">{t('about.title')}</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">
            {t('about.heading')}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
            {t('about.description')}
          </p>
        </div>

        <div className="grid gap-6 px-6 py-8 md:grid-cols-2 md:px-10 md:py-12">
          <article className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-blue-300">{t('about.whatWeBuilt')}</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{t('about.infrastructure')}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {t('about.infrastructureDesc')}
            </p>
          </article>

          <article className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-blue-300">{t('about.whyMatters')}</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{t('about.builtForSpeed')}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {t('about.speedDesc')}
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
              url: 'https://mahinltd.tech',
              logo: 'https://mahinltd.tech/logo.png',
              sameAs: ['https://sms.mahinai.app'],
              makesOffer: {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'SoftwareApplication',
                  name: 'Mahin AI SMS Gateway',
                  applicationCategory: 'BusinessApplication',
                  operatingSystem: 'Android, Web',
                  url: 'https://sms.mahinai.app',
                },
              },
            }),
          }}
        />
      </section>
    </main>
  )
}

export default AboutPage