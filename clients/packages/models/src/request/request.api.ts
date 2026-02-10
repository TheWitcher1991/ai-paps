import {
	createApi,
	createReadonlyApi,
	CrudRepository,
	HttpClientInstance,
	ReadonlyRepository,
} from '@wcsc/toolkit'
import { Paginated } from '@wcsc/types'

import { requestConfig } from './request.config'
import {
	ICreateRequest,
	IRequest,
	IUpdateRequest,
	RequestID,
	UseRequests,
} from './request.types'

export const createReadonlyRequestRepository = (http: HttpClientInstance) =>
	new ReadonlyRepository<Paginated<IRequest>, IRequest, UseRequests, RequestID>(
		http,
		requestConfig.models,
	)

export const createJRequestRepository = (http: HttpClientInstance) =>
	new CrudRepository<
		Paginated<IRequest>,
		IRequest,
		ICreateRequest,
		IUpdateRequest,
		UseRequests,
		RequestID
	>(http, requestConfig.models)

export const createReadonlyRequestApi = (http: HttpClientInstance) => {
	const api = createReadonlyApi<Paginated<IRequest>, IRequest, UseRequests, RequestID>(http, {
		list: requestConfig.models,
		detail: requestConfig.model,
		infinity: requestConfig.infiniteModels,
	})

	return {
		useRequests: api.useEntities,
		useRequest: api.useEntity,
		useInfinitRequests: api.useInfinityEntities,
		requestRepository: api.repo,
	}
}

export const createRequestApi = (http: HttpClientInstance) => {
	const api = createApi<
		Paginated<IRequest>,
		IRequest,
		ICreateRequest,
		IUpdateRequest,
		UseRequests,
		RequestID
	>(http, {
		list: requestConfig.models,
		detail: requestConfig.model,
		infinity: requestConfig.infiniteModels,
	})

	return {
		useRequests: api.useEntities,
		useJRequest: api.useEntity,
		useInfinityRequests: api.useInfinityEntities,
		useCreateRequest: api.useCreateEntity,
		useUpdateRequest: api.useUpdateEntity,
		useDeleteRequest: api.useDeleteEntity,
		requestRepository: api.repo,
	}
}
