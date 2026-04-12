// ©2026 Application or Website Name Mahin Ltd develop by (Tanvir)
import { io } from 'socket.io-client'

export function createSocketConnection(token) {
  const socketBaseUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'

  return io(socketBaseUrl, {
    path: '/socket.io',
    timeout: 10000,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1200,
    auth: {
      token,
      accessToken: token,
      authorization: token ? `Bearer ${token}` : '',
    },
  })
}
