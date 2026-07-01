import { createContext, useContext, useEffect, useState } from 'react'
import { useData } from './DataContext'

const AuthContext = createContext(null)
const STORAGE_KEY = 'moustaajel_session'

export function AuthProvider({ children }) {
  const { findUserByEmail, findUserById } = useData()
  const [userId, setUserId] = useState(() => localStorage.getItem(STORAGE_KEY) || null)

  useEffect(() => {
    if (userId) localStorage.setItem(STORAGE_KEY, userId)
    else localStorage.removeItem(STORAGE_KEY)
  }, [userId])

  const user = userId ? findUserById(userId) : null

  const login = (email, password) => {
    const found = findUserByEmail(email)
    if (!found || found.password !== password) {
      return { ok: false }
    }
    setUserId(found.id)
    return { ok: true, user: found }
  }

  const logout = () => setUserId(null)

  const value = { user, login, logout, isAuthenticated: !!user }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
