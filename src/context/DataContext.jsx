import { createContext, useContext, useCallback, useState } from 'react'
import seedData from '../data/db.json'

const DataContext = createContext(null)

const STORAGE_KEY = 'moustaajel_db'

function loadDb() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // fall through to seed
  }
  const fresh = structuredClone(seedData)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh))
  return fresh
}

function saveDb(db) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
}

let uidCounter = 0
export function uid(prefix) {
  uidCounter += 1
  return `${prefix}-${Date.now().toString(36)}-${uidCounter}`
}

export function DataProvider({ children }) {
  const [db, setDb] = useState(loadDb)

  const commit = useCallback((updater) => {
    setDb((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      saveDb(next)
      return next
    })
  }, [])

  // ---- Users ----
  const findUserByEmail = useCallback((email) => db.users.find((u) => u.email.toLowerCase() === email.toLowerCase()), [db])
  const findUserById = useCallback((id) => db.users.find((u) => u.id === id), [db])
  const addUser = useCallback(
    (user) => {
      const newUser = { id: uid('u'), createdAt: new Date().toISOString(), ...user }
      commit((prev) => ({ ...prev, users: [...prev.users, newUser] }))
      return newUser
    },
    [commit]
  )
  const updateUser = useCallback(
    (id, patch) => {
      commit((prev) => ({ ...prev, users: prev.users.map((u) => (u.id === id ? { ...u, ...patch } : u)) }))
    },
    [commit]
  )

  // ---- Huissiers ----
  const getHuissierByUserId = useCallback((userId) => db.huissiers.find((h) => h.userId === userId), [db])
  const getHuissierById = useCallback((id) => db.huissiers.find((h) => h.id === id), [db])
  const addHuissier = useCallback(
    (huissier) => {
      const newH = {
        id: uid('h'),
        available: true,
        verified: false,
        plan: 'basic',
        rating: 0,
        reviewsCount: 0,
        completedMissions: 0,
        ...huissier,
      }
      commit((prev) => ({ ...prev, huissiers: [...prev.huissiers, newH] }))
      return newH
    },
    [commit]
  )
  const updateHuissier = useCallback(
    (id, patch) => {
      commit((prev) => ({
        ...prev,
        huissiers: prev.huissiers.map((h) => (h.id === id ? { ...h, ...patch } : h)),
      }))
    },
    [commit]
  )
  const deleteHuissier = useCallback(
    (id) => {
      commit((prev) => ({ ...prev, huissiers: prev.huissiers.filter((h) => h.id !== id) }))
    },
    [commit]
  )

  // ---- Requests ----
  const addRequest = useCallback(
    (request) => {
      const now = new Date().toISOString()
      const newReq = {
        id: uid('r'),
        status: 'pending',
        createdAt: now,
        documents: [],
        price: null,
        paid: false,
        timeline: [{ status: 'pending', at: now }],
        ...request,
      }
      commit((prev) => ({ ...prev, requests: [...prev.requests, newReq] }))
      return newReq
    },
    [commit]
  )
  const updateRequest = useCallback(
    (id, patch, addTimelineStatus) => {
      commit((prev) => ({
        ...prev,
        requests: prev.requests.map((r) => {
          if (r.id !== id) return r
          const updated = { ...r, ...patch }
          if (addTimelineStatus) {
            updated.timeline = [...(r.timeline || []), { status: addTimelineStatus, at: new Date().toISOString() }]
          }
          return updated
        }),
      }))
    },
    [commit]
  )
  const getRequestById = useCallback((id) => db.requests.find((r) => r.id === id), [db])
  const getRequestsByClient = useCallback((clientId) => db.requests.filter((r) => r.clientId === clientId), [db])
  const getRequestsByHuissier = useCallback((huissierId) => db.requests.filter((r) => r.huissierId === huissierId), [db])
  const getPendingRequestsForHuissier = useCallback(
    (huissier) =>
      db.requests.filter(
        (r) => r.status === 'pending' && (!r.huissierId || r.huissierId === huissier.id) && huissier.wilayaIds.includes(r.wilayaId)
      ),
    [db]
  )

  // ---- Messages ----
  const getMessagesByRequest = useCallback((requestId) => db.messages.filter((m) => m.requestId === requestId), [db])
  const addMessage = useCallback(
    (message) => {
      const newMsg = { id: uid('m'), createdAt: new Date().toISOString(), ...message }
      commit((prev) => ({ ...prev, messages: [...prev.messages, newMsg] }))
      return newMsg
    },
    [commit]
  )

  // ---- Reviews ----
  const getReviewsByHuissier = useCallback((huissierId) => db.reviews.filter((rv) => rv.huissierId === huissierId), [db])
  const getReviewByRequest = useCallback((requestId) => db.reviews.find((rv) => rv.requestId === requestId), [db])
  const addReview = useCallback(
    (review) => {
      const newReview = { id: uid('rv'), createdAt: new Date().toISOString(), ...review }
      commit((prev) => {
        const huissiers = prev.huissiers.map((h) => {
          if (h.id !== review.huissierId) return h
          const total = h.rating * h.reviewsCount + review.rating
          const count = h.reviewsCount + 1
          return { ...h, rating: Math.round((total / count) * 10) / 10, reviewsCount: count }
        })
        return { ...prev, huissiers, reviews: [...prev.reviews, newReview] }
      })
      return newReview
    },
    [commit]
  )

  // ---- Settings ----
  const updateSettings = useCallback(
    (patch) => {
      commit((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }))
    },
    [commit]
  )

  // ---- Misc / admin ----
  const deleteUser = useCallback(
    (id) => {
      commit((prev) => ({ ...prev, users: prev.users.filter((u) => u.id !== id) }))
    },
    [commit]
  )

  const resetData = useCallback(() => {
    const fresh = structuredClone(seedData)
    saveDb(fresh)
    setDb(fresh)
  }, [])

  const exportJson = useCallback(() => JSON.stringify(db, null, 2), [db])

  const importJson = useCallback((json) => {
    const parsed = JSON.parse(json)
    saveDb(parsed)
    setDb(parsed)
  }, [])

  const value = {
    db,
    findUserByEmail,
    findUserById,
    addUser,
    updateUser,
    deleteUser,
    getHuissierByUserId,
    getHuissierById,
    addHuissier,
    updateHuissier,
    deleteHuissier,
    addRequest,
    updateRequest,
    getRequestById,
    getRequestsByClient,
    getRequestsByHuissier,
    getPendingRequestsForHuissier,
    getMessagesByRequest,
    addMessage,
    getReviewsByHuissier,
    getReviewByRequest,
    addReview,
    updateSettings,
    resetData,
    exportJson,
    importJson,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
