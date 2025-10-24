// Environment variables configuration
export const env = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  appName: import.meta.env.VITE_APP_NAME || 'Serverless ROI Calculator',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  environment: import.meta.env.VITE_ENV || 'development',
} as const

export type Env = typeof env
