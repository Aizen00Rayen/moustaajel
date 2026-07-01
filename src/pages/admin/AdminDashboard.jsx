import { useState } from 'react'
import { useLang } from '../../context/LanguageContext'
import { useData } from '../../context/DataContext'
import { formatMoney } from '../../utils/helpers'
import AdminHuissiers from './AdminHuissiers'
import AdminUsers from './AdminUsers'
import AdminRequests from './AdminRequests'
import AdminSettings from './AdminSettings'

const TABS = ['huissiers', 'users', 'requests', 'settings']

export default function AdminDashboard() {
  const { t, lang } = useLang()
  const { db } = useData()
  const [tab, setTab] = useState('huissiers')

  const clients = db.users.filter((u) => u.role === 'client').length
  const huissiers = db.users.filter((u) => u.role === 'huissier').length
  const revenue = db.requests
    .filter((r) => r.status === 'completed' && r.price)
    .reduce((sum, r) => sum + Math.round(r.price * db.settings.commissionRate), 0)

  const stats = [
    { label: t('admin_stats_users'), value: db.users.length },
    { label: t('admin_stats_clients'), value: clients },
    { label: t('admin_stats_huissiers'), value: huissiers },
    { label: t('admin_stats_requests'), value: db.requests.length },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-extrabold text-[#0e3a53] mb-8">{t('admin_dashboard_title')}</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 text-center">
            <div className="text-2xl font-extrabold text-[#0e3a53]">{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4 mb-8 text-center">
        <div className="text-xl font-extrabold text-[#37b6e0]">{formatMoney(revenue, lang, t('common_dzd'))}</div>
        <div className="text-xs text-slate-500 mt-1">{t('admin_stats_revenue')}</div>
      </div>

      <div className="flex gap-2 mb-6 border-b border-slate-200 overflow-x-auto">
        {TABS.map((tb) => (
          <button
            key={tb}
            onClick={() => setTab(tb)}
            className={`px-4 py-2 text-sm font-semibold border-b-2 -mb-px whitespace-nowrap ${
              tab === tb ? 'border-[#37b6e0] text-[#0e3a53]' : 'border-transparent text-slate-500'
            }`}
          >
            {t(`admin_tab_${tb}`)}
          </button>
        ))}
      </div>

      {tab === 'huissiers' && <AdminHuissiers />}
      {tab === 'users' && <AdminUsers />}
      {tab === 'requests' && <AdminRequests />}
      {tab === 'settings' && <AdminSettings />}
    </div>
  )
}
