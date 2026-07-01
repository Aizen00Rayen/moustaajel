import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import Logo from './Logo'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="bg-[#0e3a53] text-slate-200 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Logo className="h-10 w-10" />
            <span className="font-extrabold text-lg text-white">{t('site_name')}</span>
          </div>
          <p className="text-sm text-slate-300 max-w-xs">{t('footer_desc')}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <Link to="/about" className="hover:text-white">{t('nav_about')}</Link>
          <Link to="/directory" className="hover:text-white">{t('nav_directory')}</Link>
          <Link to="/pricing" className="hover:text-white">{t('nav_pricing')}</Link>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <Link to="/login" className="hover:text-white">{t('nav_login')}</Link>
          <Link to="/register" className="hover:text-white">{t('nav_register')}</Link>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {t('site_name')} — {t('footer_rights')}
      </div>
    </footer>
  )
}
