import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from '../i18n/translations'

const LanguageContext = createContext(null)

const STORAGE_KEY = 'moustaajel_lang'

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem(STORAGE_KEY) || 'ar')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const t = useMemo(() => {
    const dict = translations[lang] || translations.ar
    return (key) => dict[key] ?? key
  }, [lang])

  const value = {
    lang,
    dir: lang === 'ar' ? 'rtl' : 'ltr',
    setLang,
    toggleLang: () => setLang((l) => (l === 'ar' ? 'fr' : 'ar')),
    t,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
