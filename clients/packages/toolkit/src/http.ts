import type {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	CreateAxiosDefaults,
} from 'axios'
import axios from 'axios'

export interface HttpClient {
	get<T>(url: string): Promise<T>
	post<T>(url: string, data: any): Promise<T>
	put<T>(url: string, data: any): Promise<T>
	patch<T>(url: string, data: any): Promise<T>
	delete<T>(url: string): Promise<T>
}

export type HttpClientInstance = AxiosInstance

export class AxiosHttpClient implements HttpClient {
	public instance: AxiosInstance

	constructor(config?: CreateAxiosDefaults) {
		this.instance = axios.create(config)
	}

	public async get<T = any>(url: string, config?: AxiosRequestConfig<any>) {
		const res = await this.instance.get<T, AxiosResponse<T>>(url, config)
		return res.data
	}

	public async delete<T = any>(
		url: string,
		config?: AxiosRequestConfig<any>,
	) {
		const res = await this.instance.delete<T, AxiosResponse<T>>(url, config)
		return res.data
	}

	public async post<T = any>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig<any>,
	) {
		const res = await this.instance.post<T, AxiosResponse<T>>(
			url,
			data,
			config,
		)
		return res.data
	}

	public async put<T = any>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig<any>,
	) {
		const res = await this.instance.put<T, AxiosResponse<T>>(
			url,
			data,
			config,
		)
		return res.data
	}

	public async patch<T = any>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig<any>,
	) {
		const res = await this.instance.patch<T, AxiosResponse<T>>(
			url,
			data,
			config,
		)
		return res.data
	}
}