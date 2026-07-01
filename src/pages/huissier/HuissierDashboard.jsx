import { useState } from 'react'
import { useLang } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import RequestCard from '../../components/RequestCard'
import RatingStars from '../../components/RatingStars'

export default function HuissierDashboard() {
  const { t } = useLang()
  const { user } = useAuth()
  const { getHuissierByUserId, getPendingRequestsForHuissier, getRequestsByHuissier } = useData()
  const huissier = getHuissierByUserId(user.id)
  const [tab, setTab] = useState('incoming')

  if (!huissier) return null

  const incoming = getPendingRequestsForHuissier(huissier).sort((a, b) => (b.urgency === 'urgent') - (a.urgency === 'urgent'))
  const missions = getRequestsByHuissier(huissier.id)
    .filter((r) => r.status !== 'pending')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <h1 className="text-2xl font-extrabold text-[#0e3a53]">
          {t('huissier_dashboard_title')} — {user.name}
        </h1>
        <div className="flex items-center gap-3">
          <RatingStars value={huissier.rating} />
          <span className="text-sm text-slate-500">
            ({huissier.reviewsCount}) · {huissier.completedMissions} {t('huissier_missions_done')}
          </span>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${huissier.verified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
            {huissier.verified ? t('huissier_verified') : t('huissier_not_verified')}
          </span>
        </div>
      </div>

      <div className="flex gap-2 mb-6 border-b border-slate-200">
        <button
          onClick={() => setTab('incoming')}
          className={`px-4 py-2 text-sm font-semibold border-b-2 -mb-px ${tab === 'incoming' ? 'border-[#37b6e0] text-[#0e3a53]' : 'border-transparent text-slate-500'}`}
        >
          {t('huissier_incoming')} ({incoming.length})
        </button>
        <button
          onClick={() => setTab('missions')}
          className={`px-4 py-2 text-sm font-semibold border-b-2 -mb-px ${tab === 'missions' ? 'border-[#37b6e0] text-[#0e3a53]' : 'border-transparent text-slate-500'}`}
        >
          {t('huissier_my_missions')} ({missions.length})
        </button>
      </div>

      {tab === 'incoming' && (
        <>
          {incoming.length === 0 && <p className="text-slate-500 text-sm">{t('huissier_no_requests')}</p>}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {incoming.map((r) => (
              <RequestCard key={r.id} request={r} linkBase="/huissier/requests" />
            ))}
          </div>
        </>
      )}

      {tab === 'missions' && (
        <>
          {missions.length === 0 && <p className="text-slate-500 text-sm">{t('huissier_no_requests')}</p>}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {missions.map((r) => (
              <RequestCard key={r.id} request={r} linkBase="/huissier/requests" />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
