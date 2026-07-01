import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { useData } from '../context/DataContext'
import logoImg from '../assets/logo.png'

const SEGMENTS = ['individual', 'lawyer', 'notary', 'expert', 'company']

export default function Home() {
  const { t } = useLang()
  const { db } = useData()

  const stats = [
    { value: db.huissiers.filter((h) => h.verified).length, label: t('nav_directory') },
    { value: db.requests.length, label: t('admin_stats_requests') },
    { value: 58, label: t('common_wilaya') },
    { value: '24/7', label: '' },
  ]

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0e3a53] to-[#153f5c] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">{t('home_hero_title')}</h1>
            <p className="text-slate-200 text-lg mb-8">{t('home_hero_subtitle')}</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/register" className="rounded-lg bg-[#37b6e0] px-6 py-3 font-semibold text-white hover:bg-[#2a9bc4] transition-colors">
                {t('home_cta_request')}
              </Link>
              <Link to="/directory" className="rounded-lg border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10 transition-colors">
                {t('home_cta_directory')}
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex justify-center">
            <div className="h-72 w-72 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <img src={logoImg} alt="مستعجل" className="h-56 w-56 object-contain" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="rounded-xl bg-white shadow-md border border-slate-100 p-5 text-center">
              <div className="text-2xl font-extrabold text-[#0e3a53]">{s.value}</div>
              <div className="text-xs text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-extrabold text-center text-[#0e3a53] mb-10">{t('home_how_title')}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="h-10 w-10 rounded-full bg-[#37b6e0]/10 text-[#37b6e0] flex items-center justify-center font-extrabold mb-4">{n}</div>
              <h3 className="font-bold text-slate-800 mb-2">{t(`home_how_${n}_title`)}</h3>
              <p className="text-sm text-slate-600">{t(`home_how_${n}_desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-center text-[#0e3a53] mb-10">{t('home_segments_title')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {SEGMENTS.map((s) => (
              <div key={s} className="rounded-xl border border-slate-200 p-5 text-center hover:border-[#37b6e0] transition-colors">
                <h3 className="font-bold text-slate-800 mb-2">{t(`home_segment_${s}`)}</h3>
                <p className="text-xs text-slate-500">{t(`home_segment_${s}_desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-extrabold text-[#0e3a53] mb-4">{t('home_value_title')}</h2>
        <p className="text-slate-600 text-lg">{t('home_value_desc')}</p>
      </section>

      <section className="bg-[#0e3a53] text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-extrabold mb-3">{t('home_final_cta_title')}</h2>
          <p className="text-slate-200 mb-8">{t('home_final_cta_desc')}</p>
          <Link to="/register" className="rounded-lg bg-[#37b6e0] px-8 py-3 font-semibold text-white hover:bg-[#2a9bc4] transition-colors inline-block">
            {t('nav_register')}
          </Link>
        </div>
      </section>
    </div>
  )
}
