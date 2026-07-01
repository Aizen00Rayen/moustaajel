import { Link } from 'react-router-dom'
import { useLang } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import RequestCard from '../../components/RequestCard'

export default function ClientDashboard() {
  const { t } = useLang()
  const { user } = useAuth()
  const { getRequestsByClient } = useData()
  const requests = getRequestsByClient(user.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <h1 className="text-2xl font-extrabold text-[#0e3a53]">
          {t('client_dashboard_title')} — {user.name}
        </h1>
        <Link to="/client/new-request" className="rounded-lg bg-[#37b6e0] px-5 py-2.5 font-semibold text-white hover:bg-[#2a9bc4]">
          + {t('nav_new_request')}
        </Link>
      </div>

      <h2 className="font-bold text-slate-700 mb-4">{t('client_dashboard_my_requests')}</h2>
      {requests.length === 0 && <p className="text-slate-500 text-sm">{t('client_dashboard_no_requests')}</p>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {requests.map((r) => (
          <RequestCard key={r.id} request={r} linkBase="/client/requests" />
        ))}
      </div>
    </div>
  )
}
