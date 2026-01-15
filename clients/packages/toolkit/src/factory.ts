import type { AxiosInstance } from 'axios'
import axios from 'axios'

import { API_URL } from '@fgis/system'

export const domain = <T>(factory: () => T) => factory()

export const createAxiosDefaults = (apiUrl = API_URL): AxiosInstance =>
	axios.create({
		baseURL: `${apiUrl}/`,
		withCredentials: false,
		xsrfCookieName: 'csrftoken',
		xsrfHeaderName: 'X-CSRFToken',
		timeoutErrorMessage: 'Превышено время ожидания ответа от сервера',
		headers: {
			'Content-Type': 'application/json',
			'X-Requested-With': 'XMLHttpRequest',
			Accept: 'application/json',
		},
	})