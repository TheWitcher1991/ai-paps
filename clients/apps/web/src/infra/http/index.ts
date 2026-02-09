import { useSessionRequestInterceptor } from '@wcsc/models'
import { API_URL } from '@wcsc/system'
import { createAxiosDefaults } from '@wcsc/toolkit'

export const http = createAxiosDefaults(API_URL)

http.interceptors.request.use(useSessionRequestInterceptor)
