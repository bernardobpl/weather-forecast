export const API_URL = 'https://api.openweathermap.org/data/2.5'
const API_KEY = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY
const UNITS = 'metric'

export const API_ENDPOINTS = {
  forecast: '/forecast'
}

export type ApiEndpointT = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS]

export const getEndpointUrl = (endpoint: ApiEndpointT, params?: Record<string, string | number | boolean>) => {
  const formattedParams = params ? '&' + Object.entries(params).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&') : ''
  return `${API_URL}${endpoint}?appid=${API_KEY}&units=${UNITS}${formattedParams}`
}