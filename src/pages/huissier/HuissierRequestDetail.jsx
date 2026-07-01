import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLang } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import StatusBadge from '../../components/StatusBadge'
import Chat from '../../components/Chat'
import { formatDate, formatMoney, wilayaName } from '../../utils/helpers'

export default function HuissierRequestDetail() {
  const { id } = useParams()
  const { t, lang } = useLang()
  const { user } = useAuth()
  const { db, getRequestById, getHuissierByUserId, findUserById, updateRequest, updateHuissier } = useData()
  const navigate = useNavigate()
  const [price, setPrice] = useState('')

  const huissier = getHuissierByUserId(user.id)
  const request = getRequestById(id)

  if (!request || !huissier || (request.huissierId && request.huissierId !== huissier.id)) {
    navigate('/huissier')
    return null
  }
  if (!request.huissierId && !huissier.wilayaIds.includes(request.wilayaId)) {
    navigate('/huissier')
    return null
  }

  const client = findUserById(request.clientId)

  const accept = () => {
    updateRequest(request.id, { huissierId: huissier.id, status: 'accepted' }, 'accepted')
  }
  const reject = () => {
    updateRequest(request.id, { huissierId: null })
    navigate('/huissier')
  }
  const start = () => updateRequest(request.id, { status: 'in_progress' }, 'in_progress')
  const complete = () => {
    updateRequest(request.id, { status: 'completed' }, 'completed')
    updateHuissier(huissier.id, { completedMissions: huissier.completedMissions + 1 })
  }
  const savePrice = (e) => {
    e.preventDefault()
    if (!price) return
    updateRequest(request.id, { price: Number(price) })
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <button onClick={() => navigate('/huissier')} className="text-sm text-slate-500 hover:text-[#37b6e0] mb-4">
        ← {t('common_back')}
      </button>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 mb-6">
        <div className="flex items-start justify-between gap-3 flex-wrap mb-4">
          <div>
            <h1 className="text-xl font-extrabold text-[#0e3a53]">{t(`request_type_${request.type}`)}</h1>
            <p className="text-sm text-slate-500">
              {wilayaName(request.wilayaId, lang)} — {request.address}
            </p>
          </div>
          <StatusBadge status={request.status} />
        </div>
        <p className={`text-xs font-semibold mb-3 ${request.urgency === 'urgent' ? 'text-rose-600' : 'text-slate-500'}`}>
          {t(`urgency_${request.urgency}`)}
        </p>
        <p className="text-slate-700 mb-4">{request.description}</p>

        {request.documents?.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-slate-700 mb-1">{t('request_documents')}</p>
            <ul className="text-sm text-slate-500 list-disc ps-5">
              {request.documents.map((d, i) => (
                <li key={i}>{d.name}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="rounded-xl bg-slate-50 p-4 mb-4">
          <p className="font-bold text-slate-800">{client?.name}</p>
          <p className="text-xs text-slate-500">{client?.phone} · {client?.email}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {request.status === 'pending' && (
            <>
              <button onClick={accept} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
                {t('huissier_accept')}
              </button>
              {request.huissierId === huissier.id && (
                <button onClick={reject} className="rounded-lg border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50">
                  {t('huissier_reject')}
                </button>
              )}
            </>
          )}
          {request.status === 'accepted' && (
            <button onClick={start} className="rounded-lg bg-[#37b6e0] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2a9bc4]">
              {t('huissier_start')}
            </button>
          )}
          {request.status === 'in_progress' && (
            <button onClick={complete} className="rounded-lg bg-[#0e3a53] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a2c3f]">
              {t('huissier_complete')}
            </button>
          )}
        </div>

        <div className="mt-5">
          <p className="text-sm font-semibold text-slate-700 mb-2">{t('request_timeline')}</p>
          <ol className="border-s-2 border-slate-200 ps-4 space-y-2">
            {request.timeline?.map((tl, i) => (
              <li key={i} className="text-sm">
                <span className="font-semibold text-slate-700">{t(`status_${tl.status}`)}</span>
                <span className="text-slate-400"> — {formatDate(tl.at, lang)}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {request.status !== 'pending' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 mb-6">
          <h2 className="font-bold text-[#0e3a53] mb-3">{t('request_payment')}</h2>
          {request.price === null ? (
            <form onSubmit={savePrice} className="flex gap-2">
              <input
                type="number"
                min="0"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={t('request_set_price')}
                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#37b6e0]"
              />
              <button type="submit" className="rounded-lg bg-[#0e3a53] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a2c3f]">
                {t('request_set_price_btn')}
              </button>
            </form>
          ) : (
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-sm text-slate-600">
                <span>{t('request_payment_amount')}</span>
                <span className="font-bold text-slate-800">{formatMoney(request.price, lang, t('common_dzd'))}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>{t('request_payment_commission')} ({Math.round(db.settings.commissionRate * 100)}%)</span>
                <span>- {formatMoney(Math.round(request.price * db.settings.commissionRate), lang, t('common_dzd'))}</span>
              </div>
            </div>
          )}
          {request.price !== null && (
            <p className={`mt-2 text-sm font-semibold ${request.paid ? 'text-emerald-600' : 'text-amber-600'}`}>
              {request.paid ? t('request_payment_paid') : t('status_pending')}
            </p>
          )}
        </div>
      )}

      {request.status !== 'pending' && <Chat requestId={request.id} currentUserId={user.id} />}
    </div>
  )
}
