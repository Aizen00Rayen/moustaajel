import { useLang } from '../../context/LanguageContext'
import { useData } from '../../context/DataContext'
import { formatDate } from '../../utils/helpers'

function roleLabel(u, t) {
  if (u.role === 'client') return t('auth_role_client').split(' ')[0]
  if (u.role === 'huissier') return t('auth_role_huissier')
  return 'Admin'
}

export default function AdminUsers() {
  const { t, lang } = useLang()
  const { db, deleteUser } = useData()

  return (
    <>
      {/* Mobile card list */}
      <div className="flex flex-col gap-3 sm:hidden">
        {db.users.map((u) => (
          <div key={u.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="font-semibold text-slate-800">{u.name}</div>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 whitespace-nowrap">{roleLabel(u, t)}</span>
            </div>
            <div className="text-xs text-slate-500 mb-1">{u.email}</div>
            <div className="text-xs text-slate-400 mb-3">{formatDate(u.createdAt, lang)}</div>
            {u.role !== 'admin' && (
              <button onClick={() => deleteUser(u.id)} className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50">
                {t('admin_delete')}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Table for sm and up */}
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200 bg-white">
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
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">{roleLabel(u, t)}</span>
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
    </>
  )
}
