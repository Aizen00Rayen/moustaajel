import { useLang } from '../../context/LanguageContext'
import { useData } from '../../context/DataContext'
import StatusBadge from '../../components/StatusBadge'
import { formatDate, formatMoney, wilayaName } from '../../utils/helpers'

export default function AdminRequests() {
  const { t, lang } = useLang()
  const { db, findUserById, getHuissierById } = useData()

  const rows = [...db.requests].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-4 py-3 text-start">{t('new_request_type')}</th>
            <th className="px-4 py-3 text-start">{t('common_wilaya')}</th>
            <th className="px-4 py-3 text-start">{t('auth_role_client').split(' ')[0]}</th>
            <th className="px-4 py-3 text-start">{t('auth_role_huissier')}</th>
            <th className="px-4 py-3 text-start">status</th>
            <th className="px-4 py-3 text-start">{t('request_payment_amount')}</th>
            <th className="px-4 py-3 text-start">Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const client = findUserById(r.clientId)
            const huissier = r.huissierId ? getHuissierById(r.huissierId) : null
            const huissierUser = huissier ? findUserById(huissier.userId) : null
            return (
              <tr key={r.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-semibold text-slate-800">{t(`request_type_${r.type}`)}</td>
                <td className="px-4 py-3 text-slate-500">{wilayaName(r.wilayaId, lang)}</td>
                <td className="px-4 py-3 text-slate-500">{client?.name}</td>
                <td className="px-4 py-3 text-slate-500">{huissierUser?.name || '—'}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={r.status} />
                </td>
                <td className="px-4 py-3 text-slate-500">{formatMoney(r.price, lang, t('common_dzd'))}</td>
                <td className="px-4 py-3 text-xs text-slate-400">{formatDate(r.createdAt, lang)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
