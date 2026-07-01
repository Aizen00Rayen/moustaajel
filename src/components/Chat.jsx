import { useState } from 'react'
import { useLang } from '../context/LanguageContext'
import { useData } from '../context/DataContext'
import { formatDate } from '../utils/helpers'

export default function Chat({ requestId, currentUserId }) {
  const { t, lang } = useLang()
  const { getMessagesByRequest, addMessage, findUserById } = useData()
  const [text, setText] = useState('')
  const messages = getMessagesByRequest(requestId).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

  const send = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    addMessage({ requestId, senderId: currentUserId, text: text.trim() })
    setText('')
  }

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white">
      <div className="px-4 py-3 border-b border-slate-100 font-semibold text-slate-800">{t('request_chat')}</div>
      <div className="flex flex-col gap-2 p-4 max-h-72 overflow-y-auto">
        {messages.length === 0 && <p className="text-sm text-slate-400">—</p>}
        {messages.map((m) => {
          const mine = m.senderId === currentUserId
          const sender = findUserById(m.senderId)
          return (
            <div key={m.id} className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${mine ? 'self-end bg-[#0e3a53] text-white' : 'self-start bg-slate-100 text-slate-800'}`}>
              <div className="opacity-70 text-[10px] mb-0.5">{sender?.name}</div>
              <div>{m.text}</div>
              <div className="opacity-60 text-[10px] mt-1">{formatDate(m.createdAt, lang)}</div>
            </div>
          )
        })}
      </div>
      <form onSubmit={send} className="flex gap-2 p-3 border-t border-slate-100">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('request_chat_placeholder')}
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#37b6e0]"
        />
        <button type="submit" className="rounded-lg bg-[#37b6e0] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2a9bc4]">
          {t('request_chat_send')}
        </button>
      </form>
    </div>
  )
}
