import { useLang } from '../context/LanguageContext'
import { STATUS_COLORS } from '../utils/helpers'

export default function StatusBadge({ status }) {
  const { t } = useLang()
  return (
    <span className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold whitespace-nowrap ${STATUS_COLORS[status] || ''}`}>
      {t(`status_${status}`)}
    </span>
  )
}
