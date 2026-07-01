import { useLang } from '../context/LanguageContext'

export default function About() {
  const { t } = useLang()
  const activities = t('about_activities')
  const partners = t('about_partners')

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="text-3xl font-extrabold text-[#0e3a53] mb-6">{t('about_title')}</h1>
      <p className="text-slate-600 leading-relaxed mb-4">{t('about_p1')}</p>
      <p className="text-slate-600 leading-relaxed mb-10">{t('about_p2')}</p>

      <div className="rounded-xl border border-slate-200 bg-white p-6 mb-10">
        <h2 className="font-bold text-[#0e3a53] mb-2">{t('about_unique_title')}</h2>
        <p className="text-slate-600">{t('about_unique_desc')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="font-bold text-[#0e3a53] mb-4">{t('about_activities_title')}</h2>
          <ul className="space-y-2">
            {Array.isArray(activities) &&
              activities.map((a, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-600">
                  <span className="text-[#37b6e0] font-bold">•</span>
                  <span>{a}</span>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-[#0e3a53] mb-4">{t('about_partners_title')}</h2>
          <ul className="space-y-2">
            {Array.isArray(partners) &&
              partners.map((p, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-600">
                  <span className="text-[#37b6e0] font-bold">•</span>
                  <span>{p}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
