// ©2026 SMS GATEWAY Mahin Ltd develop by (Tanvir)
import { useEffect, useMemo, useState } from 'react'
import { Trash2 } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import MessageDetailsModal from '../components/MessageDetailsModal'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import { createSocketConnection } from '../services/socketService'

function normalizeList(payload, key) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.[key])) {
    return payload[key]
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  return []
}

function extractId(item) {
  return String(item?._id || item?.id || item?.messageId || item?.smsId || '')
}

function isDeviceOnline(device) {
  const value = typeof device?.status === 'string' ? device.status.toLowerCase() : device?.status
  return ['online', 'connected', 'ready', 'active', true].includes(value)
}

function isAndroidDevice(device) {
  const typeValue = String(device?.type || device?.platform || device?.deviceType || '').trim().toLowerCase()
  const nameValue = String(device?.name || device?.deviceName || device?.title || '').trim().toLowerCase()
  const deviceIdValue = String(
    device?.deviceId || device?.device_id || device?.androidDeviceId || device?.android_device_id || '',
  )
    .trim()
    .toLowerCase()

  const looksLikeWebDashboard = nameValue.includes('web dashboard') || nameValue.includes('dashboard')
  const hasValidDeviceId =
    deviceIdValue.length > 0 &&
    !['pending', 'temp', 'temporary', 'null', 'undefined'].includes(deviceIdValue)

  const isExplicitAndroidType = typeValue === 'android'
  const isMobileLikeType = ['android_client', 'android-client', 'mobile'].includes(typeValue)

  return !looksLikeWebDashboard && isDeviceOnline(device) && (isExplicitAndroidType || isMobileLikeType || hasValidDeviceId || !typeValue)
}

function getStatusBadge(status) {
  const normalized = String(status || 'pending').toLowerCase()

  if (['delivered', 'sent', 'success'].includes(normalized)) {
    return 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
  }

  if (['failed', 'error', 'undelivered'].includes(normalized)) {
    return 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
  }

  return 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
}

function sortByDateDescending(items) {
  return [...items].sort((a, b) => {
    const aTime = new Date(a?.createdAt || a?.timestamp || 0).getTime()
    const bTime = new Date(b?.createdAt || b?.timestamp || 0).getTime()
    return bTime - aTime
  })
}

function MessagesPage() {
  const { token } = useAuth()

  const [devices, setDevices] = useState([])
  const [messages, setMessages] = useState([])
  const [isLoadingDevices, setIsLoadingDevices] = useState(true)
  const [isLoadingMessages, setIsLoadingMessages] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState('')
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [form, setForm] = useState({
    deviceId: '',
    phoneNumber: '',
    message: '',
  })

  const androidDevices = useMemo(
    () => devices.filter((device) => isAndroidDevice(device)),
    [devices],
  )

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
      setMessages((previous) => previous.filter((item) => extractId(item) !== String(messageId)))
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          requestError?.response?.data?.error ||
          'Failed to delete message.',
      )
    }
  }

  useEffect(() => {
    const fetchDevices = async () => {
      setIsLoadingDevices(true)

      try {
        const response = await api.get('/devices')
        const list = normalizeList(response.data, 'devices')
        setDevices(list)

        const firstAndroidDeviceId = String(list.find((device) => isAndroidDevice(device))?._id || list.find((device) => isAndroidDevice(device))?.id || '')

        setForm((previous) => ({
          ...previous,
          deviceId: previous.deviceId || firstAndroidDeviceId,
        }))
      } catch (requestError) {
        setError(
          requestError?.response?.data?.message ||
            requestError?.response?.data?.error ||
            'Failed to fetch devices.',
        )
      } finally {
        setIsLoadingDevices(false)
      }
    }

    const fetchMessages = async () => {
      setIsLoadingMessages(true)

      try {
        const response = await api.get('/messages')
        const list = normalizeList(response.data, 'messages')
        setMessages(sortByDateDescending(list))
      } catch (requestError) {
        setError(
          requestError?.response?.data?.message ||
            requestError?.response?.data?.error ||
            'Failed to load messages.',
        )
      } finally {
        setIsLoadingMessages(false)
      }
    }

    fetchDevices()
    fetchMessages()
  }, [])

  useEffect(() => {
    if (!token) {
      return undefined
    }

    const socket = createSocketConnection(token)

    socket.on('connect_error', (socketError) => {
      setError(socketError?.message || 'Real-time connection failed. Refresh and try again.')
    })

    socket.on('SMS_STATUS_UPDATED', (payload) => {
      const payloadId = extractId(payload)
      const nextStatus = payload?.status || payload?.deliveryStatus || 'pending'

      setMessages((previous) =>
        previous.map((messageItem) =>
          extractId(messageItem) === payloadId
            ? {
                ...messageItem,
                status: nextStatus,
              }
            : messageItem,
        ),
      )
    })

    socket.on('SMS_RECEIVED', (payload) => {
      const incoming = {
        ...payload,
        direction: payload?.direction || 'received',
        status: payload?.status || 'received',
        createdAt: payload?.createdAt || payload?.timestamp || new Date().toISOString(),
      }

      setMessages((previous) => {
        const dedupKey = extractId(incoming)
        if (dedupKey && previous.some((item) => extractId(item) === dedupKey)) {
          return previous
        }

        return [incoming, ...previous]
      })
    })

    return () => {
      socket.disconnect()
    }
  }, [token])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSending(true)

    const cooldownPromise = new Promise((resolve) => {
      setTimeout(resolve, 3000)
    })

    try {
      const payload = {
        device_id: form.deviceId,
        phone_number: form.phoneNumber.trim(),
        message_body: form.message.trim(),
        deviceId: form.deviceId,
        phoneNumber: form.phoneNumber.trim(),
        to: form.phoneNumber.trim(),
        message: form.message.trim(),
        body: form.message.trim(),
      }

      const response = await api.post('/messages/send', payload)
      const created = response?.data?.message || response?.data?.data || response?.data

      if (created && typeof created === 'object') {
        setMessages((previous) =>
          sortByDateDescending([
            {
              ...created,
              direction: created.direction || 'sent',
              status: created.status || 'pending',
              createdAt: created.createdAt || new Date().toISOString(),
            },
            ...previous,
          ]),
        )
      }

      setForm((previous) => ({
        ...previous,
        phoneNumber: '',
        message: '',
      }))
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          requestError?.response?.data?.error ||
          'Message send failed.',
      )
    } finally {
      await cooldownPromise
      setIsSending(false)
    }
  }

  return (
    <main className="min-h-screen px-4 py-6 md:px-6">
      <div className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-[260px_1fr]">
        <Sidebar />

        <section className="space-y-4">
          <header className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-6 shadow-xl shadow-blue-950/20 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.2em] text-blue-300">Real-time Messaging</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Send SMS & Live Message Log</h2>
            <p className="mt-3 text-slate-300">
              Dispatch SMS from any online device and watch status updates stream in live.
            </p>
          </header>

          {error ? (
            <p className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
              {error}
            </p>
          ) : null}

          <div className="grid gap-4 xl:grid-cols-5">
            <article className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-5 shadow-xl shadow-blue-950/20 xl:col-span-2">
              <h3 className="text-lg font-semibold text-white">Send SMS</h3>
              <p className="mt-1 text-sm text-slate-300">Choose device, recipient, and message body.</p>

              <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-1 block text-sm text-slate-200" htmlFor="deviceId">
                    Device
                  </label>
                  <select
                    id="deviceId"
                    name="deviceId"
                    required
                    value={form.deviceId}
                    onChange={handleChange}
                    disabled={isLoadingDevices || isSending || androidDevices.length === 0}
                    className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-blue-500"
                  >
                    <option value="">
                      {isLoadingDevices
                        ? 'Loading devices...'
                        : androidDevices.length === 0
                          ? 'No Android Device Connected'
                          : 'Select an Android device'}
                    </option>
                    {androidDevices.map((device) => {
                      const id = String(device._id || device.id || '')
                      const displayName = device.name || device.deviceName || device.phoneModel || 'Device'

                      return (
                        <option key={id || displayName} value={id}>
                          {displayName}
                        </option>
                      )
                    })}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm text-slate-200" htmlFor="phoneNumber">
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    required
                    placeholder="+8801XXXXXXXXX"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    disabled={isSending}
                    className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-slate-200" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    disabled={isSending}
                    placeholder="Write your SMS here..."
                    className="w-full resize-y rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                    disabled={isSending || !form.deviceId || androidDevices.length === 0}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-900"
                >
                  {isSending ? (
                    <>
                      <LoadingSpinner />
                      Sending... Please wait (3s)
                    </>
                  ) : (
                    'Send SMS'
                  )}
                </button>
              </form>
            </article>

            <article className="rounded-2xl border border-slate-700/80 bg-slate-800/90 p-5 shadow-xl shadow-blue-950/20 xl:col-span-3">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Message Log</h3>
                <span className="rounded-full border border-slate-600 bg-slate-900 px-3 py-1 text-xs text-slate-300">
                  {messages.length} total
                </span>
              </div>

              {isLoadingMessages ? (
                <div className="flex items-center gap-2 text-slate-300">
                  <LoadingSpinner />
                  Loading history...
                </div>
              ) : null}

              {!isLoadingMessages && messages.length === 0 ? (
                <p className="text-sm text-slate-300">No messages yet. Sent and received SMS will appear here.</p>
              ) : null}

              {!isLoadingMessages && messages.length > 0 ? (
                <ul className="space-y-3">
                  {messages.map((item, index) => {
                    const id = extractId(item) || `${item?.createdAt || 'msg'}-${index}`
                    const createdLabel = item?.createdAt || item?.timestamp
                    const direction = String(item?.direction || item?.type || 'sent').toLowerCase()
                    const isIncoming = ['received', 'inbound', 'incoming'].includes(direction)
                    const fromOrTo = item?.to || item?.phoneNumber || item?.from || 'Unknown number'
                    const bodyText =
                      item?.messageBody ||
                      item?.message_body || item?.message || item?.body || item?.text || '(No content)'

                    return (
                      <li
                        key={id}
                        role="button"
                        tabIndex={0}
                        onClick={() => openMessageDetails(item)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            openMessageDetails(item)
                          }
                        }}
                        className="cursor-pointer rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 transition hover:bg-slate-800"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.08em] ${
                                isIncoming
                                  ? 'bg-blue-500/20 text-blue-300'
                                  : 'bg-slate-700 text-slate-200'
                              }`}
                            >
                              {isIncoming ? 'Received' : 'Sent'}
                            </span>
                            <span className="text-sm text-slate-300">{fromOrTo}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`rounded-full px-2 py-0.5 text-xs ${getStatusBadge(item?.status)}`}>
                              {item?.status || 'Pending'}
                            </span>
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation()
                                handleDelete(extractId(item))
                              }}
                              className="rounded-md border border-slate-600 p-1.5 text-slate-300 transition hover:bg-slate-700 hover:text-rose-300"
                              aria-label="Delete message"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        <p className="mt-2 whitespace-pre-wrap break-words text-sm text-slate-100">{bodyText}</p>

                        <p className="mt-2 text-xs text-slate-400">
                          {createdLabel ? new Date(createdLabel).toLocaleString() : 'Just now'}
                        </p>
                      </li>
                    )
                  })}
                </ul>
              ) : null}
            </article>
          </div>
        </section>
      </div>

      <MessageDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRetry={(messageData) => openMessageDetails(messageData)}
        messageData={selectedMessage}
      />
    </main>
  )
}

export default MessagesPage
