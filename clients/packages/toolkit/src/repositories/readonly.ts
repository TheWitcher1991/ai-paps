import { prepareRequestParams } from '../fn'
import { HttpClientInstance } from '../http'

import type { Dictionary, RequestResponse } from '@fgis/types'

import { BaseRepository } from './base'

export class ReadonlyRepository<
	LIST_GET,
	GET,
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
}
