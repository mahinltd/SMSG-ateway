// ©2026 SMS GATEWAY Mahin Ltd Developed By Tanvir
import { Link } from 'react-router-dom'

function SiteFooter() {
  return (
    <footer className="mt-6 rounded-2xl border border-slate-700/80 bg-slate-900/70 px-5 py-4 text-sm text-slate-300 backdrop-blur">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          ©2026 SMS GATEWAY Mahin Ltd Developed By Tanvir
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <Link to="/privacy" className="transition hover:text-blue-300">
            Privacy Policy
          </Link>
          <Link to="/terms" className="transition hover:text-blue-300">
            Terms &amp; Conditions
          </Link>
          <Link to="/contact" className="transition hover:text-blue-300">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter