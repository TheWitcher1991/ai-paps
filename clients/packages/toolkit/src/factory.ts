import type { AxiosInstance, CreateAxiosDefaults } from 'axios'
import axios from 'axios'

export const getAxiosDefaults = (apiUrl: string): CreateAxiosDefaults => ({
	baseURL: `${apiUrl}/`,
	withCredentials: true,
	xsrfCookieName: 'csrftoken',
	xsrfHeaderName: 'X-CSRFToken',
	timeoutErrorMessage: 'Превышено время ожидания ответа от сервера',
	headers: {
		'Content-Type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest',
		Accept: 'application/json',
	},
})

export const createAxiosDefaults = (apiUrl: string): AxiosInstance =>
	axios.create(getAxiosDefaults(apiUrl))

export const domain = <T>(factory: () => T) => factory()
