// ©2026 SMS GATEWAY Mahin Ltd Developed By Tanvir
import { Code2, Globe, Mail } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

function ContactPage() {
  const { t } = useLanguage()

  const contactLinks = [
    {
      labelKey: 'contact.email',
      valueKey: 'contact.emailValue',
      href: `mailto:${t('contact.emailValue')}`,
      icon: Mail,
    },
    {
      labelKey: 'contact.facebook',
      valueKey: 'contact.facebookValue',
      href: 'https://www.facebook.com/tanvir8268',
      icon: Globe,
    },
    {
      labelKey: 'contact.github',
      valueKey: 'contact.githubValue',
      href: 'https://www.github.com/mahinltd',
      icon: Code2,
    },
  ]

  return (
    <main className="min-h-screen px-4 py-8 md:px-6 md:py-10">
      <section className="mx-auto w-full max-w-4xl rounded-3xl border border-slate-700/80 bg-slate-800/90 p-6 shadow-2xl shadow-blue-950/30 backdrop-blur md:p-10">
        <p className="text-sm uppercase tracking-[0.2em] text-blue-300">{t('contact.badge')}</p>
        <h1 className="mt-2 text-3xl font-semibold text-white md:text-4xl">{t('contact.title')}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base md:leading-8">
          {t('contact.description')}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {contactLinks.map(({ labelKey, valueKey, href, icon: Icon }) => (
            <a
              key={labelKey}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-slate-700 bg-slate-900/60 p-5 transition hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-900"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300 transition group-hover:bg-blue-500/25 group-hover:text-blue-200">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{t(labelKey)}</p>
                  <p className="mt-1 break-words text-sm font-medium text-white transition group-hover:text-blue-200">
                    {t(valueKey)}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-700 bg-slate-900/50 p-5 text-sm leading-7 text-slate-300 md:text-base">
          <p className="font-medium text-white">Need something else?</p>
          <p className="mt-2">
            Please include your account email, device name, and a short description so we can
            respond quickly.
          </p>
        </div>
      </section>
    </main>
  )
}

export default ContactPage
