import { HttpClientInstance } from '../http'

import { RequestResponse } from '@wcsc/types'

import { BaseRepository } from './base'

export class ActionRepository<
	ID extends string | number = number,
> extends BaseRepository {
	constructor(
		readonly http: HttpClientInstance,
		readonly URL: string,
	) {
		super(http, URL)
	}

	async export(id: ID, signal?: AbortSignal): RequestResponse {
		return await this.http.post(`${this.URL}/${id}/export/`, {
			signal,
		})
	}

	async request(id: ID, signal?: AbortSignal): RequestResponse {
		return await this.http.post(`${this.URL}/${id}/request/`, {
			signal,
		})
	}
}
