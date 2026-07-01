import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import StatusBadge from './StatusBadge'
import { formatDate, wilayaName } from '../utils/helpers'

export default function RequestCard({ request, linkBase }) {
  const { t, lang } = useLang()
  return (
    <Link
      to={`${linkBase}/${request.id}`}
      className="block rounded-xl border border-slate-200 bg-white p-4 hover:shadow-md hover:border-[#37b6e0] transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <div className="font-bold text-slate-800">{t(`request_type_${request.type}`)}</div>
          <div className="text-xs text-slate-500">{wilayaName(request.wilayaId, lang)}</div>
        </div>
        <StatusBadge status={request.status} />
      </div>
      <p className="text-sm text-slate-600 line-clamp-2">{request.description}</p>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span className={request.urgency === 'urgent' ? 'text-rose-600 font-semibold' : ''}>{t(`urgency_${request.urgency}`)}</span>
        <span>{formatDate(request.createdAt, lang)}</span>
      </div>
    </Link>
  )
}
