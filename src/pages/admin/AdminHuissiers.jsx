import { useLang } from '../../context/LanguageContext'
import { useData } from '../../context/DataContext'
import RatingStars from '../../components/RatingStars'
import { wilayaName } from '../../utils/helpers'

export default function AdminHuissiers() {
  const { t, lang } = useLang()
  const { db, findUserById, updateHuissier, deleteHuissier, deleteUser } = useData()

  const remove = (h) => {
    deleteHuissier(h.id)
    deleteUser(h.userId)
  }

  return (
    <>
      {/* Mobile card list */}
      <div className="flex flex-col gap-3 sm:hidden">
        {db.huissiers.map((h) => {
          const owner = findUserById(h.userId)
          return (
            <div key={h.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="font-semibold text-slate-800">{owner?.name}</div>
                  <div className="text-xs text-slate-400">{owner?.email}</div>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs font-semibold whitespace-nowrap ${h.verified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {h.verified ? t('huissier_verified') : t('huissier_not_verified')}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <RatingStars value={h.rating} />
                <span className="text-xs text-slate-500">{t(`plan_${h.plan}`)}</span>
              </div>
              <p className="text-xs text-slate-500 mb-3">{h.wilayaIds.map((id) => wilayaName(id, lang)).join('، ')}</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => updateHuissier(h.id, { verified: !h.verified })}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-[#37b6e0] hover:text-[#37b6e0]"
                >
                  {h.verified ? t('admin_unverify') : t('admin_verify')}
                </button>
                <button onClick={() => remove(h)} className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50">
                  {t('admin_delete')}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Table for sm and up */}
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 text-start">{t('auth_name')}</th>
              <th className="px-4 py-3 text-start">{t('auth_wilayas_competence')}</th>
              <th className="px-4 py-3 text-start">{t('huissier_rating')}</th>
              <th className="px-4 py-3 text-start">{t('huissier_subscription_title')}</th>
              <th className="px-4 py-3 text-start">{t('admin_tab_huissiers')}</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {db.huissiers.map((h) => {
              const owner = findUserById(h.userId)
              return (
                <tr key={h.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-800">{owner?.name}</div>
                    <div className="text-xs text-slate-400">{owner?.email}</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500 max-w-xs">{h.wilayaIds.map((id) => wilayaName(id, lang)).join('، ')}</td>
                  <td className="px-4 py-3">
                    <RatingStars value={h.rating} />
                  </td>
                  <td className="px-4 py-3">{t(`plan_${h.plan}`)}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${h.verified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {h.verified ? t('huissier_verified') : t('huissier_not_verified')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => updateHuissier(h.id, { verified: !h.verified })}
                        className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-[#37b6e0] hover:text-[#37b6e0]"
                      >
                        {h.verified ? t('admin_unverify') : t('admin_verify')}
                      </button>
                      <button onClick={() => remove(h)} className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50">
                        {t('admin_delete')}
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
