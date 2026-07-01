import { useState } from 'react'
import { useLang } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { WILAYAS } from '../../data/wilayas'

const CLIENT_TYPES = ['individual', 'lawyer', 'notary', 'expert', 'company', 'admin_body']

export default function ClientProfile() {
  const { t, lang } = useLang()
  const { user } = useAuth()
  const { updateUser } = useData()
  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone,
    clientType: user.clientType || 'individual',
    wilayaId: user.wilayaId || 13,
  })
  const [saved, setSaved] = useState(false)

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const submit = (e) => {
    e.preventDefault()
    updateUser(user.id, { ...form, wilayaId: Number(form.wilayaId) })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-extrabold text-[#0e3a53] mb-6">{user.name}</h1>
      <form onSubmit={submit} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6">
        <div>
          <label className="text-sm font-semibold text-slate-700">{t('auth_name')}</label>
          <input value={form.name} onChange={(e) => update('name', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#37b6e0]" />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">{t('auth_phone')}</label>
          <input value={form.phone} onChange={(e) => update('phone', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#37b6e0]" />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">{t('auth_client_type')}</label>
          <select value={form.clientType} onChange={(e) => update('clientType', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#37b6e0]">
            {CLIENT_TYPES.map((ct) => (
              <option key={ct} value={ct}>
                {t(`client_type_${ct}`)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">{t('auth_wilaya')}</label>
          <select value={form.wilayaId} onChange={(e) => update('wilayaId', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#37b6e0]">
            {WILAYAS.map((w) => (
              <option key={w.id} value={w.id}>
                {lang === 'ar' ? w.ar : w.fr}
              </option>
            ))}
          </select>
        </div>
        {saved && <p className="text-sm text-emerald-600 font-semibold">{t('admin_settings_saved')}</p>}
        <button type="submit" className="rounded-lg bg-[#0e3a53] px-4 py-2.5 font-semibold text-white hover:bg-[#0a2c3f] self-start">
          {t('common_save')}
        </button>
      </form>
    </div>
  )
}
