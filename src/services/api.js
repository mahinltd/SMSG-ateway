// ©2026 SMS GATEWAY Mahin Ltd develop by (Tanvir)
import axios from 'axios'

function normalizeApiBaseUrl(rawUrl) {
  const fallback = 'https://smsgateway-f3ay.onrender.com/api'
  const input = (rawUrl || fallback).trim()

  const withoutTrailingSlash = input.replace(/\/+$/, '')
  if (withoutTrailingSlash.endsWith('/api')) {
    return withoutTrailingSlash
  }

  return `${withoutTrailingSlash}/api`
}

const api = axios.create({
  baseURL: normalizeApiBaseUrl(import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL),
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sms_gateway_token')

  config.headers = config.headers || {}

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.DEV) {
      const method = (error?.config?.method || 'GET').toUpperCase()
      const requestUrl = `${error?.config?.baseURL || ''}${error?.config?.url || ''}`
      console.error('API request failed', {
        method,
        url: requestUrl,
        status: error?.response?.status,
        data: error?.response?.data,
      })
    }

    return Promise.reject(error)
  },
)

export default api
