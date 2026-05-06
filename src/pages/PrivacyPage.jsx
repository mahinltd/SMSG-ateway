// ©2026 SMS GATEWAY Mahin Ltd develop by (Tanvir)
import { useLanguage } from '../context/LanguageContext'

function PrivacyPage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen px-4 py-8 md:px-6">
      <section className="mx-auto w-full max-w-5xl rounded-3xl border border-slate-700/80 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 py-8 shadow-2xl shadow-blue-950/30 backdrop-blur md:px-10 md:py-12">
        <p className="text-sm uppercase tracking-[0.28em] text-blue-300">{t('privacy.badge')}</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">
          {t('privacy.title')}
        </h1>
        <p className="mt-5 max-w-4xl text-base leading-8 text-slate-300 md:text-lg">
          {t('privacy.description')}
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
            <h2 className="text-2xl font-semibold text-white">{t('privacy.permissions')}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {t('privacy.permissionsDesc')}
            </p>
          </article>

          <article className="rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
            <h2 className="text-2xl font-semibold text-white">{t('privacy.handling')}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {t('privacy.handlingDesc')}
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default PrivacyPage
