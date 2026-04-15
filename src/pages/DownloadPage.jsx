// ©2026 SMS GATEWAY Mahin Ltd Developed By Tanvir
import { Download } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { useLanguage } from '../context/LanguageContext'

function DownloadPage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen px-4 py-6 md:px-6">
      <div className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-[260px_1fr]">
        <Sidebar />

        <section className="space-y-4">
          <header className="overflow-hidden rounded-2xl border border-slate-700/80 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 shadow-xl shadow-blue-950/30 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-300">{t('download.mobileClient')}</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">{t('download.title')}</h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              {t('download.description')}
            </p>

            <a
              href="/app-release.apk"
              download
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-500"
            >
              <Download size={18} />
              {t('download.downloadApk')}
            </a>
          </header>

          <article className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
            <h3 className="text-lg font-semibold text-white">{t('download.beforeInstall')}</h3>
            <p className="mt-2 text-slate-300">
              {t('download.beforeInstallDescription')}
            </p>
          </article>
        </section>
      </div>
    </main>
  )
}

export default DownloadPage
