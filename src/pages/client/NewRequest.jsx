import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { WILAYAS } from '../../data/wilayas'
import { REQUEST_TYPES, URGENCY_LEVELS } from '../../utils/helpers'

export default function NewRequest() {
  const { t, lang } = useLang()
  const { user } = useAuth()
  const { db, addRequest, findUserById } = useData()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    type: 'signification',
    urgency: 'standard',
    wilayaId: user.wilayaId || 13,
    address: '',
    description: '',
    huissierId: '',
  })
  const [files, setFiles] = useState([])
  const [success, setSuccess] = useState(false)

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const availableHuissiers = useMemo(
    () => db.huissiers.filter((h) => h.verified && h.available && h.wilayaIds.includes(Number(form.wilayaId))),
    [db.huissiers, form.wilayaId]
  )

  const onFiles = (e) => {
    setFiles(Array.from(e.target.files).map((f) => ({ name: f.name })))
  }

  const submit = (e) => {
    e.preventDefault()
    const newReq = addRequest({
      clientId: user.id,
      huissierId: form.huissierId || null,
      type: form.type,
      urgency: form.urgency,
      wilayaId: Number(form.wilayaId),
      address: form.address,
      description: form.description,
      documents: files,
    })
    setSuccess(true)
    setTimeout(() => navigate(`/client/requests/${newReq.id}`), 900)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-extrabold text-[#0e3a53] mb-6">{t('new_request_title')}</h1>

      {success && <div className="mb-4 rounded-lg bg-emerald-100 text-emerald-800 px-4 py-3 text-sm font-semibold">{t('new_request_success')}</div>}

      <form onSubmit={submit} className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6">
        <div>
          <label className="text-sm font-semibold text-slate-700">{t('new_request_type')}</label>
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {REQUEST_TYPES.map((rt) => (
              <button
                key={rt}
                type="button"
                onClick={() => update('type', rt)}
                className={`rounded-lg border-2 px-3 py-2 text-xs font-semibold ${
                  form.type === rt ? 'border-[#37b6e0] bg-[#37b6e0]/10 text-[#0e3a53]' : 'border-slate-200 text-slate-600'
                }`}
              >
                {t(`request_type_${rt}`)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">{t('new_request_urgency')}</label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {URGENCY_LEVELS.map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => update('urgency', u)}
                className={`rounded-lg border-2 px-3 py-2 text-sm font-semibold ${
                  form.urgency === u
                    ? u === 'urgent'
                      ? 'border-rose-400 bg-rose-50 text-rose-700'
                      : 'border-[#37b6e0] bg-[#37b6e0]/10 text-[#0e3a53]'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                {t(`urgency_${u}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">{t('new_request_wilaya')}</label>
            <select value={form.wilayaId} onChange={(e) => update('wilayaId', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#37b6e0]">
              {WILAYAS.map((w) => (
                <option key={w.id} value={w.id}>
                  {lang === 'ar' ? w.ar : w.fr}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">{t('new_request_address')}</label>
            <input required value={form.address} onChange={(e) => update('address', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#37b6e0]" />
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">{t('new_request_description')}</label>
          <textarea required rows={4} value={form.description} onChange={(e) => update('description', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#37b6e0]" />
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">{t('new_request_documents')}</label>
          <input type="file" multiple onChange={onFiles} className="mt-1 w-full text-sm" />
          {files.length > 0 && <p className="text-xs text-slate-500 mt-1">{files.map((f) => f.name).join(', ')}</p>}
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">{t('new_request_pick_huissier')}</label>
          <select value={form.huissierId} onChange={(e) => update('huissierId', e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#37b6e0]">
            <option value="">{t('new_request_auto')}</option>
            {availableHuissiers.map((h) => {
              const owner = findUserById(h.userId)
              return (
                <option key={h.id} value={h.id}>
                  {owner?.name} — {h.officeName}
                </option>
              )
            })}
          </select>
        </div>

        <button type="submit" className="rounded-lg bg-[#0e3a53] px-4 py-2.5 font-semibold text-white hover:bg-[#0a2c3f]">
          {t('new_request_submit')}
        </button>
      </form>
    </div>
  )
}
