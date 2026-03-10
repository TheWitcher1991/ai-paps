import {
	createApi,
	createReadonlyApi,
	CrudRepository,
	HttpClientInstance,
	ReadonlyRepository,
} from '@wcsc/toolkit'
import { Paginated } from '@wcsc/types'

import { inferenceConfig } from './inference.config'
import {
	ICreateInference,
	IInference,
	InferenceID,
	IUpdateInference,
	UseInferences,
} from './inference.types'

export const createReadonlyInferenceRepository = (http: HttpClientInstance) =>
	new ReadonlyRepository<
		Paginated<IInference>,
		IInference,
		UseInferences,
		InferenceID
	>(http, inferenceConfig.models)

export const createInferenceRepository = (http: HttpClientInstance) =>
	new CrudRepository<
		Paginated<IInference>,
		IInference,
		ICreateInference,
		IUpdateInference,
		UseInferences,
		InferenceID
	>(http, inferenceConfig.models)

export const createReadonlyInferenceApi = (http: HttpClientInstance) => {
	const api = createReadonlyApi<
		Paginated<IInference>,
		IInference,
		UseInferences,
		InferenceID
	>(http, {
		list: inferenceConfig.models,
		detail: inferenceConfig.model,
		infinity: inferenceConfig.infiniteModels,
	})

	return {
		useInferences: api.useEntities,
		useInference: api.useEntity,
		useInfinitInferences: api.useInfinityEntities,
		taskRepository: api.repo,
	}
}

export const createInferenceApi = (http: HttpClientInstance) => {
	const api = createApi<
		Paginated<IInference>,
		IInference,
		ICreateInference,
		IUpdateInference,
		UseInferences,
		InferenceID
	>(http, {
		list: inferenceConfig.models,
		detail: inferenceConfig.model,
		infinity: inferenceConfig.infiniteModels,
	})

	return {
		useInferences: api.useEntities,
		useInference: api.useEntity,
		useInfinityInferences: api.useInfinityEntities,
		useCreateInference: api.useCreateEntity,
		useUpdateInference: api.useUpdateEntity,
		useDeleteInference: api.useDeleteEntity,
		taskRepository: api.repo,
	}
}
