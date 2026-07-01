import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'

export default function NotFound() {
  const { t } = useLang()
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-4xl font-extrabold text-[#0e3a53] mb-4">404</h1>
      <p className="text-slate-600 mb-6">{t('not_found_title')}</p>
      <Link to="/" className="rounded-lg bg-[#0e3a53] px-5 py-2.5 font-semibold text-white hover:bg-[#0a2c3f]">
        {t('not_found_back')}
      </Link>
    </div>
  )
}
