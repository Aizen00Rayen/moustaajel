import { useState } from 'react'
import { useLang } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { WILAYAS } from '../../data/wilayas'

export default function HuissierProfile() {
  const { t, lang } = useLang()
  const { user } = useAuth()
  const { getHuissierByUserId, updateHuissier, updateUser } = useData()
  const huissier = getHuissierByUserId(user.id)

  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone,
    officeName: huissier.officeName,
    bio: huissier.bio,
    available: huissier.available,
    wilayaIds: huissier.wilayaIds,
  })
  const [saved, setSaved] = useState(false)

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))
  const toggleWilaya = (id) => {
    setForm((f) => {
      const has = f.wilayaIds.includes(id)
      return { ...f, wilayaIds: has ? f.wilayaIds.filter((w) => w !== id) : [...f.wilayaIds, id] }
    })
  }

  const submit = (e) => {
    e.preventDefault()
    updateUser(user.id, { name: form.name, phone: form.phone })
    updateHuissier(huissier.id, {
      officeName: form.officeName,
      bio: form.bio,
      available: form.available,
      wilayaIds: form.wilayaIds,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-extrabold text-[#0e3a53] mb-6">{t('huissier_profile_title')}</h1>
      <form onSubmit={submit} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6">
        <label className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
          <span className="text-sm font-semibold text-slate-700">{form.available ? t('huissier_available') : t('huissier_unavailable')}</span>
          <input type="checkbox" checked={form.available} onChange={(e) => update('available', e.target.checked)} className="h-5 w-5" />
        </label>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">{t('auth_name')}</label>
            <input value={form.name} onChange={(e) => update('name', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#37b6e0]" />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">{t('auth_phone')}</label>
            <input value={form.phone} onChange={(e) => update('phone', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#37b6e0]" />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">{t('auth_office_name')}</label>
          <input value={form.officeName} onChange={(e) => update('officeName', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#37b6e0]" />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">{t('auth_wilayas_competence')}</label>
          <div className="mt-2 max-h-48 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-1.5 rounded-lg border border-slate-200 p-3">
            {WILAYAS.map((w) => (
              <label key={w.id} className="flex items-center gap-1.5 text-xs text-slate-600">
                <input type="checkbox" checked={form.wilayaIds.includes(w.id)} onChange={() => toggleWilaya(w.id)} />
                {lang === 'ar' ? w.ar : w.fr}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">{t('auth_bio')}</label>
          <textarea value={form.bio} onChange={(e) => update('bio', e.target.value)} rows={3} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#37b6e0]" />
        </div>

        {saved && <p className="text-sm text-emerald-600 font-semibold">{t('admin_settings_saved')}</p>}
        <button type="submit" className="rounded-lg bg-[#0e3a53] px-4 py-2.5 font-semibold text-white hover:bg-[#0a2c3f] self-start">
          {t('huissier_save')}
        </button>
      </form>
    </div>
  )
}
