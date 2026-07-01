import { useLang } from '../../context/LanguageContext'
import { useData } from '../../context/DataContext'
import { formatDate } from '../../utils/helpers'

export default function AdminUsers() {
  const { t, lang } = useLang()
  const { db, deleteUser } = useData()

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-4 py-3 text-start">{t('auth_name')}</th>
            <th className="px-4 py-3 text-start">{t('auth_email')}</th>
            <th className="px-4 py-3 text-start">Role</th>
            <th className="px-4 py-3 text-start">Date</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {db.users.map((u) => (
            <tr key={u.id} className="border-t border-slate-100">
              <td className="px-4 py-3 font-semibold text-slate-800">{u.name}</td>
              <td className="px-4 py-3 text-slate-500">{u.email}</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                  {u.role === 'client' ? t('auth_role_client').split(' ')[0] : u.role === 'huissier' ? t('auth_role_huissier') : 'Admin'}
                </span>
              </td>
              <td className="px-4 py-3 text-xs text-slate-400">{formatDate(u.createdAt, lang)}</td>
              <td className="px-4 py-3">
                {u.role !== 'admin' && (
                  <button onClick={() => deleteUser(u.id)} className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50">
                    {t('admin_delete')}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
