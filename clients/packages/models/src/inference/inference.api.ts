import {
	BaseRepository,
	createApi,
	createReadonlyApi,
	CrudRepository,
	HttpClientInstance,
	ReadonlyRepository,
} from '@wcsc/toolkit'
import { Paginated, RequestResponse } from '@wcsc/types'

import { inferenceConfig } from './inference.config'
import {
	ICreateInference,
	IInference,
	InferenceID,
	IUpdateInference,
	IPredictionResult,
	ModelID,
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

export class InferencePredictionRepository extends BaseRepository {
	constructor(http: HttpClientInstance) {
		super(http, inferenceConfig.models)
	}

	async predict(
		modelId: ModelID,
		image: File | Blob,
	): RequestResponse<IPredictionResult> {
		const formData = new FormData()
		formData.append('image', image)

		return this.http.post<IPredictionResult>(
			`${this.URL}/${modelId}/predict/`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		)
	}

	async predictWithConfidence(
		modelId: ModelID,
		image: File | Blob,
	): RequestResponse<IPredictionResult> {
		const formData = new FormData()
		formData.append('image', image)

		return this.http.post<IPredictionResult>(
			`${this.URL}/${modelId}/predict_with_confidence/`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		)
	}
}

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

export const createInferencePredictionApi = (http: HttpClientInstance) => {
	const repository = new InferencePredictionRepository(http)

	return {
		inferencePredictionRepository: repository,
	}
}
