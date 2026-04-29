// ©2026 SMS GATEWAY Mahin Ltd develop by (Tanvir)
import { io } from 'socket.io-client'

export function createSocketConnection(token) {
  const socketBaseUrl = import.meta.env.VITE_SOCKET_URL || 'https://smsgateway-f3ay.onrender.com'

  return io(socketBaseUrl, {
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
}
