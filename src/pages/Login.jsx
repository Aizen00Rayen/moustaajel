import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'

const DEMO_ACCOUNTS = [
  { email: 'client@example.com', password: '123456', role: 'client' },
  { email: 'huissier@example.com', password: '123456', role: 'huissier' },
  { email: 'admin@moustaajel.dz', password: 'admin123', role: 'admin' },
]

function roleHome(role) {
  if (role === 'client') return '/client'
  if (role === 'huissier') return '/huissier'
  if (role === 'admin') return '/admin'
  return '/'
}

export default function Login() {
  const { t } = useLang()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const res = login(email, password)
    if (!res.ok) {
      setError(t('auth_error_invalid'))
      return
    }
    navigate(roleHome(res.user.role))
  }

  const fillDemo = (acc) => {
    setEmail(acc.email)
    setPassword(acc.password)
    setError('')
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-extrabold text-[#0e3a53] mb-6 text-center">{t('auth_login_title')}</h1>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">{t('auth_email')}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#37b6e0]"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">{t('auth_password')}</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#37b6e0]"
            />
          </div>
          {error && <p className="text-sm text-rose-600">{error}</p>}
          <button type="submit" className="rounded-lg bg-[#0e3a53] px-4 py-2.5 font-semibold text-white hover:bg-[#0a2c3f]">
            {t('auth_login_btn')}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-600">
          {t('auth_no_account')}{' '}
          <Link to="/register" className="font-semibold text-[#37b6e0]">
            {t('nav_register')}
          </Link>
        </p>

        <div className="mt-6 border-t border-slate-100 pt-4">
          <p className="text-xs font-semibold text-slate-500 mb-2">{t('auth_demo_accounts')}</p>
          <div className="flex flex-col gap-1.5">
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.email}
                type="button"
                onClick={() => fillDemo(acc)}
                className="text-start text-xs rounded-lg bg-slate-50 hover:bg-slate-100 px-3 py-2 text-slate-600"
              >
                <span className="font-semibold">
                  {acc.role === 'admin' ? 'Admin' : t(`auth_role_${acc.role}`).split(' ')[0]}
                </span>{' '}
                — {acc.email} / {acc.password}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
