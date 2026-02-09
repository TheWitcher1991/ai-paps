import { $session, login, logout, sessionConfig } from '@wcsc/models'
import { API_URL } from '@wcsc/system'
import { AxiosHttpClient, getAxiosDefaults } from '@wcsc/toolkit'
import { RequestError } from '@wcsc/types'

export const http = new AxiosHttpClient(getAxiosDefaults(API_URL)).instance

http.interceptors.request.use(
	async config => {
		const access_token = $session.getState().jwt
		if (access_token) {
			config.headers.Authorization = `Bearer ${access_token}`
		}
		return config
	},
	(error: RequestError) => Promise.reject(error),
)

http.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config

		if (!error.response) {
			return Promise.reject(error)
		}

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true

			try {
				const response = await http.get(sessionConfig.refresh)

				const newAccessToken = response.data

				login({
					jwt: newAccessToken,
				})

				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

				return http(originalRequest)
			} catch (refreshError) {
				logout()
				window.location.replace('/')
				return Promise.reject(refreshError)
			}
		}
		return Promise.reject(error)
	},
)
