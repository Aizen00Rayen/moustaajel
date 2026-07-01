import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLang } from '../../context/LanguageContext'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import StatusBadge from '../../components/StatusBadge'
import RatingStars from '../../components/RatingStars'
import Chat from '../../components/Chat'
import { formatDate, formatMoney, wilayaName } from '../../utils/helpers'

export default function RequestDetail() {
  const { id } = useParams()
  const { t, lang } = useLang()
  const { user } = useAuth()
  const { db, getRequestById, getHuissierById, findUserById, updateRequest, getReviewByRequest, addReview } = useData()
  const navigate = useNavigate()
  const [ratingValue, setRatingValue] = useState(5)
  const [comment, setComment] = useState('')

  const request = getRequestById(id)
  if (!request || request.clientId !== user.id) {
    navigate('/client')
    return null
  }

  const huissier = request.huissierId ? getHuissierById(request.huissierId) : null
  const huissierUser = huissier ? findUserById(huissier.userId) : null
  const review = getReviewByRequest(request.id)
  const total = request.price ? request.price + db.settings.clientServiceFee : null

  const cancelRequest = () => {
    updateRequest(request.id, { status: 'cancelled' }, 'cancelled')
  }

  const pay = () => {
    updateRequest(request.id, { paid: true })
  }

  const submitReview = (e) => {
    e.preventDefault()
    addReview({ requestId: request.id, huissierId: huissier.id, clientId: user.id, rating: ratingValue, comment })
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <button onClick={() => navigate('/client')} className="text-sm text-slate-500 hover:text-[#37b6e0] mb-4">
        ← {t('common_back')}
      </button>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 mb-6">
        <div className="flex items-start justify-between gap-3 flex-wrap mb-4">
          <div>
            <h1 className="text-xl font-extrabold text-[#0e3a53]">{t(`request_type_${request.type}`)}</h1>
            <p className="text-sm text-slate-500">{wilayaName(request.wilayaId, lang)} — {request.address}</p>
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
          {huissierUser ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-800">{huissierUser.name}</p>
                <p className="text-xs text-slate-500">{huissier.officeName}</p>
              </div>
              <RatingStars value={huissier.rating} />
            </div>
          ) : (
            <p className="text-sm font-semibold text-slate-700">{t('request_no_huissier')}</p>
          )}
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-700 mb-2">{t('request_timeline')}</p>
          <ol className="border-s-2 border-slate-200 ps-4 space-y-3">
            {request.timeline?.map((tl, i) => (
              <li key={i} className="text-sm">
                <span className="font-semibold text-slate-700">{t(`status_${tl.status}`)}</span>
                <span className="text-slate-400"> — {formatDate(tl.at, lang)}</span>
              </li>
            ))}
          </ol>
        </div>

        {request.status === 'pending' && (
          <button onClick={cancelRequest} className="mt-4 text-sm font-semibold text-rose-600 hover:underline">
            {t('status_cancelled')}
          </button>
        )}
      </div>

      {request.price !== null && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 mb-6">
          <h2 className="font-bold text-[#0e3a53] mb-3">{t('request_payment')}</h2>
          <div className="flex justify-between text-sm text-slate-600 mb-1">
            <span>{t('request_payment_amount')}</span>
            <span>{formatMoney(request.price, lang, t('common_dzd'))}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-600 mb-3">
            <span>{t('request_payment_service_fee')}</span>
            <span>{formatMoney(db.settings.clientServiceFee, lang, t('common_dzd'))}</span>
          </div>
          <div className="flex justify-between font-bold text-slate-800 mb-4 border-t border-slate-100 pt-3">
            <span>{t('request_payment_total')}</span>
            <span>{formatMoney(total, lang, t('common_dzd'))}</span>
          </div>
          {request.paid ? (
            <p className="text-emerald-600 font-semibold text-sm">{t('request_payment_paid')}</p>
          ) : (
            <button onClick={pay} className="w-full rounded-lg bg-[#37b6e0] px-4 py-2.5 font-semibold text-white hover:bg-[#2a9bc4]">
              {t('request_payment_pay_btn')}
            </button>
          )}
        </div>
      )}

      {huissierUser && <div className="mb-6"><Chat requestId={request.id} currentUserId={user.id} /></div>}

      {request.status === 'completed' && huissier && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-[#0e3a53] mb-3">{t('request_rate_title')}</h2>
          {review ? (
            <div>
              <RatingStars value={review.rating} />
              <p className="text-sm text-slate-600 mt-2">{review.comment}</p>
              <p className="text-xs text-emerald-600 mt-2 font-semibold">{t('request_rate_done')}</p>
            </div>
          ) : (
            <form onSubmit={submitReview} className="flex flex-col gap-3">
              <RatingStars value={ratingValue} onChange={setRatingValue} size="text-2xl" />
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#37b6e0]" />
              <button type="submit" className="rounded-lg bg-[#0e3a53] px-4 py-2.5 font-semibold text-white hover:bg-[#0a2c3f] self-start">
                {t('request_rate_submit')}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}
