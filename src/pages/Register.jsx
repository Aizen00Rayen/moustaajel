import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import { WILAYAS } from '../data/wilayas'

const CLIENT_TYPES = ['individual', 'lawyer', 'notary', 'expert', 'company', 'admin_body']

export default function Register() {
  const { t, lang } = useLang()
  const { login } = useAuth()
  const { findUserByEmail, addUser, addHuissier } = useData()
  const navigate = useNavigate()

  const [role, setRole] = useState('client')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    clientType: 'individual',
    wilayaId: 13,
    officeName: '',
    wilayaIds: [13],
    bio: '',
  })
  const [error, setError] = useState('')

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const toggleWilaya = (id) => {
    setForm((f) => {
      const has = f.wilayaIds.includes(id)
      return { ...f, wilayaIds: has ? f.wilayaIds.filter((w) => w !== id) : [...f.wilayaIds, id] }
    })
  }

  const submit = (e) => {
    e.preventDefault()
    setError('')
    if (findUserByEmail(form.email)) {
      setError(t('auth_error_exists'))
      return
    }

    const baseUser = { role, name: form.name, email: form.email, password: form.password, phone: form.phone }

    if (role === 'client') {
      const newUser = addUser({ ...baseUser, clientType: form.clientType, wilayaId: Number(form.wilayaId) })
      login(newUser.email, newUser.password)
      navigate('/client')
    } else {
      const newUser = addUser(baseUser)
      addHuissier({
        userId: newUser.id,
        officeName: form.officeName || form.name,
        wilayaIds: form.wilayaIds.length ? form.wilayaIds : [Number(form.wilayaId)],
        bio: form.bio,
      })
      login(newUser.email, newUser.password)
      navigate('/huissier')
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-extrabold text-[#0e3a53] mb-2 text-center">{t('auth_register_title')}</h1>

        <div className="mb-6">
          <p className="text-sm font-semibold text-slate-700 mb-2">{t('auth_role_question')}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('client')}
              className={`rounded-lg border-2 px-4 py-3 text-sm font-semibold text-start transition-colors ${
                role === 'client' ? 'border-[#37b6e0] bg-[#37b6e0]/10 text-[#0e3a53]' : 'border-slate-200 text-slate-600'
              }`}
            >
              {t('auth_role_client')}
            </button>
            <button
              type="button"
              onClick={() => setRole('huissier')}
              className={`rounded-lg border-2 px-4 py-3 text-sm font-semibold text-start transition-colors ${
                role === 'huissier' ? 'border-[#37b6e0] bg-[#37b6e0]/10 text-[#0e3a53]' : 'border-slate-200 text-slate-600'
              }`}
            >
              {t('auth_role_huissier')}
            </button>
          </div>
        </div>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">{t('auth_name')}</label>
              <input required value={form.name} onChange={(e) => update('name', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#37b6e0]" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">{t('auth_phone')}</label>
              <input required value={form.phone} onChange={(e) => update('phone', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#37b6e0]" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">{t('auth_email')}</label>
              <input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#37b6e0]" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">{t('auth_password')}</label>
              <input type="password" required value={form.password} onChange={(e) => update('password', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#37b6e0]" />
            </div>
          </div>

          {role === 'client' && (
            <div className="grid sm:grid-cols-2 gap-4">
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
            </div>
          )}

          {role === 'huissier' && (
            <>
              <div>
                <label className="text-sm font-semibold text-slate-700">{t('auth_office_name')}</label>
                <input value={form.officeName} onChange={(e) => update('officeName', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#37b6e0]" />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700">{t('auth_wilayas_competence')}</label>
                <div className="mt-2 max-h-40 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-1.5 rounded-lg border border-slate-200 p-3">
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
            </>
          )}

          {error && <p className="text-sm text-rose-600">{error}</p>}

          <button type="submit" className="rounded-lg bg-[#0e3a53] px-4 py-2.5 font-semibold text-white hover:bg-[#0a2c3f]">
            {t('auth_register_btn')}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600">
          {t('auth_have_account')}{' '}
          <Link to="/login" className="font-semibold text-[#37b6e0]">
            {t('nav_login')}
          </Link>
        </p>
      </div>
    </div>
  )
}
