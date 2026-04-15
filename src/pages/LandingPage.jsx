// ©2026 SMS GATEWAY Mahin Ltd Developed By Tanvir
import { ArrowRight, BarChart3, CheckCircle2, Download, Network, QrCode, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import SiteFooter from '../components/SiteFooter'
import { useLanguage } from '../context/LanguageContext'

function LandingPage() {
  const { language, setLanguage, t } = useLanguage()

  const features = [
    {
      title: t('landing.featureRealtimeTitle'),
      description: t('landing.featureRealtimeDescription'),
      icon: Sparkles,
    },
    {
      title: t('landing.featureMultipartTitle'),
      description: t('landing.featureMultipartDescription'),
      icon: Network,
    },
    {
      title: t('landing.featureAnalyticsTitle'),
      description: t('landing.featureAnalyticsDescription'),
      icon: BarChart3,
    },
    {
      title: t('landing.featurePairingTitle'),
      description: t('landing.featurePairingDescription'),
      icon: QrCode,
    },
    {
      title: t('landing.featureClarityTitle'),
      description: t('landing.featureClarityDescription'),
      icon: ShieldCheck,
    },
  ]

  const steps = [
    {
      title: t('landing.step1Title'),
      description: t('landing.step1Description'),
    },
    {
      title: t('landing.step2Title'),
      description: t('landing.step2Description'),
    },
    {
      title: t('landing.step3Title'),
      description: t('landing.step3Description'),
    },
  ]

  const glanceItems = [t('landing.glance1'), t('landing.glance2'), t('landing.glance3')]

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#0f172a_55%,_#111827_100%)] px-4 py-6 text-white md:px-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 rounded-[2rem] border border-slate-700/70 bg-slate-900/70 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur md:p-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-blue-300">
              {t('landing.badge')}
            </div>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              {t('landing.heroTitle')}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              {t('landing.heroDescription')}
            </p>
          </div>

          <div className="flex items-center rounded-lg border border-slate-600 bg-slate-900/70 p-1 text-xs font-semibold text-slate-300">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`rounded-md px-2 py-1 transition ${
                language === 'en' ? 'bg-blue-600 text-white' : 'hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('bn')}
              className={`rounded-md px-2 py-1 transition ${
                language === 'bn' ? 'bg-blue-600 text-white' : 'hover:text-white'
              }`}
            >
              BN
            </button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-[1.15fr_0.85fr] md:items-stretch">
          <div className="rounded-[1.75rem] border border-slate-700/80 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-300">{t('landing.welcome')}</p>
            <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">{t('landing.welcomeTitle')}</h2>
            <p className="mt-4 max-w-xl text-slate-300">
              {t('landing.welcomeDescription')}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                {t('landing.login')}
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800/60 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-blue-500 hover:text-white"
              >
                {t('landing.register')}
              </Link>
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-slate-700/80 bg-slate-800/80 p-6 shadow-lg shadow-blue-950/20 md:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-300">{t('landing.atGlance')}</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{t('landing.atGlanceTitle')}</h2>
            <div className="mt-6 space-y-4">
              {glanceItems.map((item) => (
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
            <p className="text-sm uppercase tracking-[0.2em] text-blue-300">{t('landing.howItWorks')}</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{t('landing.howTitle')}</h2>
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
            <p className="text-sm uppercase tracking-[0.2em] text-blue-300">{t('landing.downloadSection')}</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{t('landing.downloadTitle')}</h2>
            <p className="mt-4 text-slate-300">
              {t('landing.downloadDescription')}
            </p>

            <Link
              to="/download"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              <Download size={16} />
              {t('landing.downloadButton')}
            </Link>
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
