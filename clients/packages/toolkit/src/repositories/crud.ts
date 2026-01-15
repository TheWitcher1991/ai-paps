import { prepareRequestParams } from '../fn'
import { HttpClientInstance } from '../http'

import type { Dictionary, RequestResponse } from '@fgis/types'

import { BaseRepository } from './base'

export class CrudRepository<
	LIST_GET,
	GET,
	CREATE,
	UPDATE,
	OPTIONS = Dictionary<any>,
	ID extends string | number = number,
> extends BaseRepository {
	constructor(
		readonly http: HttpClientInstance,
		readonly URL: string,
	) {
		super(http, URL)
	}

	async findAll(
		params?: Partial<OPTIONS>,
		signal?: AbortSignal,
	): RequestResponse<LIST_GET> {
		return await this.http.get<LIST_GET>(`${this.URL}/`, {
			params: prepareRequestParams(params),
			signal,
		})
	}

	async findById(id: ID, signal?: AbortSignal): RequestResponse<GET> {
		return await this.http.get<GET>(`${this.URL}/${id}/`, {
			signal,
		})
	}

	async add(data: CREATE, signal?: AbortSignal): RequestResponse<GET> {
		return await this.http.post<GET>(`${this.URL}/`, data, {
			signal,
		})
	}

	async create(data: CREATE, signal?: AbortSignal): RequestResponse<GET> {
		return await this.http.post<GET>(`${this.URL}/`, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			signal,
		})
	}

	async update(
		id: ID,
		data: Partial<UPDATE>,
		signal?: AbortSignal,
	): RequestResponse<GET> {
		return await this.http.patch<GET>(`${this.URL}/${id}/`, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			signal,
		})
	}

	async edit(
		id: ID,
		data: Partial<UPDATE>,
		signal?: AbortSignal,
	): RequestResponse<GET> {
		return await this.http.patch<GET>(`${this.URL}/${id}/`, data, {
			signal,
		})
	}

	async delete(id: ID, signal?: AbortSignal): RequestResponse<unknown> {
		return await this.http.delete(`${this.URL}/${id}/`, {
			signal,
		})
	}
}
