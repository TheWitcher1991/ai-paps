import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

/**
 * Создание настроенного Axios экземпляра
 */
export function createAxiosInstance(baseURL: string): AxiosInstance {
  const instance = axios.create({
    baseURL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return instance
}

export function createAxiosDefaults(baseURL: string): AxiosInstance {
  return createAxiosInstance(baseURL)
}

export type { AxiosRequestConfig }
