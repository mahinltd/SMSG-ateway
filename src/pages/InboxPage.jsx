// ©2026 SMS GATEWAY Mahin Ltd develop by (Tanvir)
import { useEffect, useMemo, useState } from 'react'
import { Trash2 } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import MessageDetailsModal from '../components/MessageDetailsModal'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import { createSocketConnection } from '../services/socketService'

function normalizeMessages(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.messages)) {
    return payload.messages
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  return []
}

function isReceivedMessage(message) {
  const direction = String(message?.direction || '').toLowerCase()
  const type = String(message?.type || '').toLowerCase()
  return ['received', 'inbound', 'incoming'].includes(direction) || ['received', 'inbound', 'incoming'].includes(type)
}

function extractMessageId(message) {
  return String(message?._id || message?.id || message?.messageId || message?.smsId || '')
}

function sortByNewest(messages) {
  return [...messages].sort((a, b) => {
    const aTime = new Date(a?.createdAt || a?.timestamp || 0).getTime()
    const bTime = new Date(b?.createdAt || b?.timestamp || 0).getTime()
    return bTime - aTime
  })
}

function InboxPage() {
  const { token } = useAuth()

  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true)
      setError('')

      try {
        const response = await api.get('/messages')
        const filtered = normalizeMessages(response.data).filter(isReceivedMessage)
        setMessages(sortByNewest(filtered))
      } catch (requestError) {
        setError(
          requestError?.response?.data?.message ||
            requestError?.response?.data?.error ||
            'Could not load inbox messages.',
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()
  }, [])

  useEffect(() => {
    if (!token) {
      return undefined
    }

    const socket = createSocketConnection(token)

    socket.on('SMS_RECEIVED', (payload) => {
      const incoming = {
        ...payload,
        direction: payload?.direction || 'received',
        type: payload?.type || 'received',
        createdAt: payload?.createdAt || payload?.timestamp || new Date().toISOString(),
      }

      if (!isReceivedMessage(incoming)) {
        return
      }

      setMessages((previous) => {
        const incomingId = extractMessageId(incoming)
        if (incomingId && previous.some((item) => extractMessageId(item) === incomingId)) {
          return previous
        }

        return [incoming, ...previous]
      })
    })

    return () => {
      socket.disconnect()
    }
  }, [token])

  const totalReceived = useMemo(() => messages.length, [messages])

  const openMessageDetails = (message) => {
    const bodyText =
      message?.messageBody ||
      message?.message_body ||
      message?.message ||
      message?.body ||
      message?.text ||
      '(No content)'

    setSelectedMessage({
      ...message,
      messageBody: bodyText,
      message_body: bodyText,
      message: bodyText,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (messageId) => {
    if (!messageId) {
      return
    }

    const confirmed = window.confirm('Are you sure you want to delete this message?')
    if (!confirmed) {
      return
    }

    try {
      await api.delete('/messages/' + messageId)
      setMessages((previous) => previous.filter((item) => extractMessageId(item) !== String(messageId)))
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          requestError?.response?.data?.error ||
          'Failed to delete message.',
      )
    }
  }

  return (
    <main className="min-h-screen px-4 py-6 md:px-6">
      <div className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-[260px_1fr]">
        <Sidebar />

        <section className="space-y-4">
          <header className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Inbox</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Received SMS</h2>
            <p className="mt-3 text-slate-300">
              Live incoming messages from your connected Android devices.
            </p>
          </header>

          <article className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-5 shadow-xl shadow-blue-950/20">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Inbox Log</h3>
              <span className="rounded-full border border-slate-600 bg-slate-900 px-3 py-1 text-xs text-slate-300">
                {totalReceived} received
              </span>
            </div>

            {isLoading ? (
              <div className="flex items-center gap-2 text-slate-300">
                <LoadingSpinner />
                Loading inbox...
              </div>
            ) : null}

            {!isLoading && error ? (
              <p className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
                {error}
              </p>
            ) : null}

            {!isLoading && !error && messages.length === 0 ? (
              <p className="text-sm text-slate-300">No received messages yet.</p>
            ) : null}

            {!isLoading && !error && messages.length > 0 ? (
              <ul className="space-y-3">
                {messages.map((message, index) => {
                  const key = extractMessageId(message) || `${message?.createdAt || 'inbox'}-${index}`
                  const messageId = extractMessageId(message)
                  const sender = message?.from || message?.phoneNumber || message?.sender || 'Unknown sender'
                  const bodyText =
                    message?.messageBody ||
                    message?.message_body ||
                    message?.message ||
                    message?.body ||
                    message?.text ||
                    '(No content)'
                  const rawDate = message?.createdAt || message?.timestamp

                  return (
                    <li
                      key={key}
                      role="button"
                      tabIndex={0}
                      onClick={() => openMessageDetails(message)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          openMessageDetails(message)
                        }
                      }}
                      className="cursor-pointer rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 transition hover:bg-slate-800"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.08em] text-blue-300">
                            From
                          </span>
                          <span className="text-sm text-slate-200">{sender}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">
                            {rawDate ? new Date(rawDate).toLocaleString() : 'Just now'}
                          </span>
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation()
                              handleDelete(messageId)
                            }}
                            className="rounded-md border border-slate-600 p-1.5 text-slate-300 transition hover:bg-slate-700 hover:text-rose-300"
                            aria-label="Delete message"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <p className="mt-2 whitespace-pre-wrap break-words text-sm text-slate-100">{bodyText}</p>
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </article>
        </section>
      </div>

      <MessageDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        messageData={selectedMessage}
      />
    </main>
  )
}

export default InboxPage
