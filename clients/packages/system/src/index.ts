export const IS_CLIENT = typeof window !== 'undefined'

export const IS_DEV = process.env.NODE_ENV === 'development'

export const IS_PROD = process.env.NODE_ENV === 'production'

export const API_URL = `${process.env.API_URL || 'http://localhost:8000/api/'}`

export const BASE_ROOT_URL = '/'

export const PHONE_MASK = '+7__________'

export const DATE_MASK = 'dd.mm.yyyy'

export const IMAGE_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export const AUDIO_FILE_TYPES = ['audio/mpeg']

export const VIDEO_FILE_TYPES = ['video/mp4', 'video/quicktime', '.mov', '.avi']

export const JWT_HEADER = 'jwt'

export const JWT_REFRESH_HEADER = 'jwt-refresh'

export const AUTH_HEADER_KEY = 'Bearer'