import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { useData } from '../context/DataContext'
import { WILAYAS } from '../data/wilayas'
import { wilayaName } from '../utils/helpers'
import RatingStars from '../components/RatingStars'

export default function HuissierDirectory() {
  const { t, lang } = useLang()
  const { db, findUserById } = useData()
  const [wilayaFilter, setWilayaFilter] = useState('')
  const [availableOnly, setAvailableOnly] = useState(false)

  const results = useMemo(() => {
    return db.huissiers
      .filter((h) => h.verified)
      .filter((h) => (wilayaFilter ? h.wilayaIds.includes(Number(wilayaFilter)) : true))
      .filter((h) => (availableOnly ? h.available : true))
      .sort((a, b) => (b.plan === 'premium') - (a.plan === 'premium') || b.rating - a.rating)
  }, [db.huissiers, wilayaFilter, availableOnly])

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="text-3xl font-extrabold text-[#0e3a53] mb-8 text-center">{t('directory_title')}</h1>

      <div className="flex flex-wrap gap-4 mb-8 items-center justify-center">
        <select
          value={wilayaFilter}
          onChange={(e) => setWilayaFilter(e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#37b6e0]"
        >
          <option value="">{t('directory_all_wilayas')}</option>
          {WILAYAS.map((w) => (
            <option key={w.id} value={w.id}>
              {lang === 'ar' ? w.ar : w.fr}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" checked={availableOnly} onChange={(e) => setAvailableOnly(e.target.checked)} />
          {t('directory_filter_available')}
        </label>
      </div>

      {results.length === 0 && <p className="text-center text-slate-500">{t('directory_no_results')}</p>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {results.map((h) => {
          const owner = findUserById(h.userId)
          return (
            <div key={h.id} className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col gap-2">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-bold text-slate-800">{owner?.name}</div>
                  <div className="text-xs text-slate-500">{h.officeName}</div>
                </div>
                {h.plan === 'premium' && (
                  <span className="rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-1">★ {t('plan_premium')}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <RatingStars value={h.rating} />
                <span className="text-xs text-slate-500">
                  ({h.reviewsCount}) · {h.completedMissions} {t('directory_missions')}
                </span>
              </div>
              <div className="text-xs text-slate-500">
                {h.wilayaIds.map((id) => wilayaName(id, lang)).join('، ')}
              </div>
              <span className={`text-xs font-semibold ${h.available ? 'text-emerald-600' : 'text-slate-400'}`}>
                {h.available ? t('huissier_available') : t('huissier_unavailable')}
              </span>
              <p className="text-sm text-slate-600 line-clamp-2">{h.bio}</p>
              <Link
                to="/register"
                className="mt-2 text-center rounded-lg bg-[#0e3a53] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a2c3f]"
              >
                {t('directory_view_profile')}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
