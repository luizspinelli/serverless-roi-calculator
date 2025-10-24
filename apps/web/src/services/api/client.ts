import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { env } from '@/config'

// Create axios instance
export const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: env.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Log request in development
    if (env.isDevelopment) {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      })
    }

    return config
  },
  (error: AxiosError) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (env.isDevelopment) {
      console.log('✅ API Response:', {
        status: response.status,
        data: response.data,
      })
    }

    return response
  },
  (error: AxiosError) => {
    // Handle errors
    if (error.response) {
      // Server responded with error status
      const status = error.response.status
      const data = error.response.data as any

      console.error('❌ API Error:', {
        status,
        message: data?.message || error.message,
        data,
      })

      // Handle specific status codes
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('auth_token')
          window.location.href = '/login'
          break
        case 403:
          // Forbidden
          console.error('Access forbidden')
          break
        case 404:
          // Not found
          console.error('Resource not found')
          break
        case 500:
          // Server error
          console.error('Server error')
          break
        default:
          console.error(`Error ${status}:`, data?.message || error.message)
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('❌ Network Error:', error.message)
    } else {
      // Something else happened
      console.error('❌ Error:', error.message)
    }

    return Promise.reject(error)
  }
)
