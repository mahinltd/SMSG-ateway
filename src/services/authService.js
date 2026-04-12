// ©2026 Application or Website Name Mahin Ltd develop by (Tanvir)
import api from './api'

export async function loginUser(payload) {
  const response = await api.post('/auth/login', {
    email: payload.email?.trim(),
    password: payload.password,
  })
  return response.data
}

export async function registerUser(payload) {
  const cleanedName = payload.name?.trim()
  const response = await api.post('/auth/register', {
    name: cleanedName,
    fullName: cleanedName,
    username: cleanedName,
    email: payload.email?.trim(),
    password: payload.password,
  })
  return response.data
}
