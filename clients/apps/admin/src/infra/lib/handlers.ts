import axios from 'axios'
import { logout } from '@wcsc/models'

/**
 * Обработчик ошибок Axios — авто-рефреш JWT по 401
 */
export function axiosErrorHandler(error: unknown): never {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      logout()
    }
  }
  throw error
}

/**
 * Универсальная обёртка для запросов
 */
export async function query<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    return axiosErrorHandler(error as Error)
  }
}
