// ©2026 SMS GATEWAY Mahin Ltd develop by (Tanvir)
import { io } from 'socket.io-client'

export function createSocketConnection(token) {
  const socketBaseUrl = 'https://smsgateway-f3ay.onrender.com'

  const socket = io(socketBaseUrl, {
    path: '/socket.io',
    transports: ['polling'],
    timeout: 10000,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1200,
    auth: {
      token,
      accessToken: token,
      authorization: token ? `Bearer ${token}` : '',
    },
    query: {
      token,
      accessToken: token,
      authorization: token ? `Bearer ${token}` : '',
    },
  })

  if (import.meta.env.DEV) {
    socket.onAny((event, ...args) => {
      if (['SMS_STATUS_UPDATED', 'messageStatusUpdated', 'SMS_RECEIVED'].includes(event)) {
        console.log(`[Socket Event: ${event}]`, args[0])
      }
    })
    socket.on('connect', () => {
      console.log('[Socket] Connected to backend')
    })
    socket.on('disconnect', (reason) => {
      console.log('[Socket] Disconnected:', reason)
    })
  }

  return socket
}
