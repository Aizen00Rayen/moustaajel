import { WILAYAS } from '../data/wilayas'

export function wilayaName(id, lang) {
  const w = WILAYAS.find((w) => w.id === Number(id))
  if (!w) return ''
  return lang === 'ar' ? w.ar : w.fr
}

export function formatDate(iso, lang) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString(lang === 'ar' ? 'ar-DZ' : 'fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatMoney(amount, lang, currencyLabel) {
  if (amount === null || amount === undefined) return '—'
  const n = Number(amount).toLocaleString(lang === 'ar' ? 'ar-DZ' : 'fr-FR')
  return `${n} ${currencyLabel}`
}

export const REQUEST_TYPES = ['signification', 'constat', 'execution', 'other']
export const URGENCY_LEVELS = ['urgent', 'standard']
export const STATUSES = ['pending', 'accepted', 'in_progress', 'completed', 'cancelled']

export const STATUS_COLORS = {
  pending: 'bg-amber-100 text-amber-800 border-amber-300',
  accepted: 'bg-sky-100 text-sky-800 border-sky-300',
  in_progress: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  completed: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  cancelled: 'bg-rose-100 text-rose-800 border-rose-300',
}
