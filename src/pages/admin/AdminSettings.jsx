import { useRef, useState } from 'react'
import { useLang } from '../../context/LanguageContext'
import { useData } from '../../context/DataContext'

export default function AdminSettings() {
  const { t } = useLang()
  const { db, updateSettings, resetData, exportJson, importJson } = useData()
  const [commissionPct, setCommissionPct] = useState(Math.round(db.settings.commissionRate * 100))
  const [fee, setFee] = useState(db.settings.clientServiceFee)
  const [saved, setSaved] = useState(false)
  const fileRef = useRef(null)

  const submit = (e) => {
    e.preventDefault()
    updateSettings({ commissionRate: Number(commissionPct) / 100, clientServiceFee: Number(fee) })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const download = () => {
    const blob = new Blob([exportJson()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'moustaajel-db.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const upload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        importJson(reader.result)
      } catch {
        // ignore invalid file
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const doReset = () => {
    if (window.confirm(t('admin_reset_confirm'))) resetData()
  }

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <form onSubmit={submit} className="rounded-xl border border-slate-200 bg-white p-6 flex flex-col gap-4">
        <div>
          <label className="text-sm font-semibold text-slate-700">{t('admin_commission_rate')}</label>
          <input type="number" min="0" max="100" value={commissionPct} onChange={(e) => setCommissionPct(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#37b6e0]" />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">{t('admin_service_fee')}</label>
          <input type="number" min="0" value={fee} onChange={(e) => setFee(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#37b6e0]" />
        </div>
        {saved && <p className="text-sm text-emerald-600 font-semibold">{t('admin_settings_saved')}</p>}
        <button type="submit" className="rounded-lg bg-[#0e3a53] px-4 py-2.5 font-semibold text-white hover:bg-[#0a2c3f] self-start">
          {t('admin_save_settings')}
        </button>
      </form>

      <div className="rounded-xl border border-slate-200 bg-white p-6 flex flex-col gap-3">
        <p className="text-sm font-semibold text-slate-700">JSON DB</p>
        <div className="flex flex-wrap gap-3">
          <button onClick={download} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-[#37b6e0] hover:text-[#37b6e0]">
            ⭳ Export JSON
          </button>
          <button onClick={() => fileRef.current?.click()} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-[#37b6e0] hover:text-[#37b6e0]">
            ⭱ Import JSON
          </button>
          <input ref={fileRef} type="file" accept="application/json" hidden onChange={upload} />
        </div>
      </div>

      <div className="rounded-xl border border-rose-200 bg-rose-50 p-6">
        <button onClick={doReset} className="rounded-lg border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100">
          {t('admin_reset_data')}
        </button>
      </div>
    </div>
  )
}
