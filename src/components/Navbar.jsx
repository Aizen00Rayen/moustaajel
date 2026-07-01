import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'

function roleHome(role) {
  if (role === 'client') return '/client'
  if (role === 'huissier') return '/huissier'
  if (role === 'admin') return '/admin'
  return '/'
}

export default function Navbar() {
  const { t, lang, toggleLang } = useLang()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setOpen(false)
  }

  const publicLinks = [
    { to: '/', label: t('nav_home') },
    { to: '/about', label: t('nav_about') },
    { to: '/directory', label: t('nav_directory') },
    { to: '/pricing', label: t('nav_pricing') },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <Logo className="h-11 w-11" />
            <div className="leading-tight">
              <div className="font-extrabold text-lg text-[#0e3a53]">{t('site_name')}</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {publicLinks.map((l) => (
              <Link key={l.to} to={l.to} className="text-sm font-medium text-slate-700 hover:text-[#37b6e0] transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:border-[#37b6e0] hover:text-[#37b6e0] transition-colors"
              title={t('common_language')}
            >
              {lang === 'ar' ? 'FR' : 'AR'}
            </button>
            {!user && (
              <>
                <Link to="/login" className="text-sm font-semibold text-slate-700 hover:text-[#37b6e0]">
                  {t('nav_login')}
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-[#0e3a53] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a2c3f] transition-colors"
                >
                  {t('nav_register')}
                </Link>
              </>
            )}
            {user && (
              <>
                {user.role === 'client' && (
                  <Link to="/client/new-request" className="text-sm font-semibold text-slate-700 hover:text-[#37b6e0]">
                    {t('nav_new_request')}
                  </Link>
                )}
                {user.role === 'client' && (
                  <Link to="/client/profile" className="text-sm font-semibold text-slate-700 hover:text-[#37b6e0]">
                    {t('nav_profile')}
                  </Link>
                )}
                {user.role === 'huissier' && (
                  <Link to="/huissier/profile" className="text-sm font-semibold text-slate-700 hover:text-[#37b6e0]">
                    {t('nav_profile')}
                  </Link>
                )}
                {user.role === 'huissier' && (
                  <Link to="/huissier/subscription" className="text-sm font-semibold text-slate-700 hover:text-[#37b6e0]">
                    {t('nav_subscription')}
                  </Link>
                )}
                <Link
                  to={roleHome(user.role)}
                  className="rounded-lg bg-[#0e3a53] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a2c3f] transition-colors"
                >
                  {t('nav_dashboard')}
                </Link>
                <button onClick={handleLogout} className="text-sm font-semibold text-slate-700 hover:text-rose-600">
                  {t('nav_logout')}
                </button>
              </>
            )}
          </div>

          <button className="md:hidden p-2 text-slate-700" onClick={() => setOpen((o) => !o)} aria-label="menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="flex flex-col gap-1 px-4 py-3">
            {publicLinks.map((l) => (
              <Link key={l.to} to={l.to} className="py-2 text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <button onClick={toggleLang} className="py-2 text-start text-sm font-semibold text-slate-700">
              {t('common_language')}: {lang === 'ar' ? 'العربية' : 'Français'} ({lang === 'ar' ? 'FR' : 'AR'})
            </button>
            {!user && (
              <>
                <Link to="/login" className="py-2 text-sm font-semibold text-slate-700" onClick={() => setOpen(false)}>
                  {t('nav_login')}
                </Link>
                <Link to="/register" className="py-2 text-sm font-semibold text-[#0e3a53]" onClick={() => setOpen(false)}>
                  {t('nav_register')}
                </Link>
              </>
            )}
            {user && (
              <>
                {user.role === 'client' && (
                  <Link to="/client/new-request" className="py-2 text-sm font-semibold text-slate-700" onClick={() => setOpen(false)}>
                    {t('nav_new_request')}
                  </Link>
                )}
                {user.role === 'client' && (
                  <Link to="/client/profile" className="py-2 text-sm font-semibold text-slate-700" onClick={() => setOpen(false)}>
                    {t('nav_profile')}
                  </Link>
                )}
                {user.role === 'huissier' && (
                  <Link to="/huissier/profile" className="py-2 text-sm font-semibold text-slate-700" onClick={() => setOpen(false)}>
                    {t('nav_profile')}
                  </Link>
                )}
                {user.role === 'huissier' && (
                  <Link to="/huissier/subscription" className="py-2 text-sm font-semibold text-slate-700" onClick={() => setOpen(false)}>
                    {t('nav_subscription')}
                  </Link>
                )}
                <Link to={roleHome(user.role)} className="py-2 text-sm font-semibold text-[#0e3a53]" onClick={() => setOpen(false)}>
                  {t('nav_dashboard')}
                </Link>
                <button onClick={handleLogout} className="py-2 text-start text-sm font-semibold text-rose-600">
                  {t('nav_logout')}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
