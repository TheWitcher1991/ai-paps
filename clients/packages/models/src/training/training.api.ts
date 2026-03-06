import {
	createApi,
	createReadonlyApi,
	HttpClientInstance,
	ReadonlyRepository,
} from '@wcsc/toolkit'
import { Paginated } from '@wcsc/types'

import { trainingConfig } from './training.config'
import {
	ICreateTraining,
	ITraining,
	IUpdateTraining,
	TrainingID,
	UseTrainings,
} from './training.types'

export const createReadonlyTrainingRepository = (http: HttpClientInstance) =>
	new ReadonlyRepository<
		Paginated<ITraining>,
		ITraining,
		UseTrainings,
		TrainingID
	>(http, trainingConfig.models)

export const createReadonlyTrainingApi = (http: HttpClientInstance) => {
	const api = createReadonlyApi<
		Paginated<ITraining>,
		ITraining,
		UseTrainings,
		TrainingID
	>(http, {
		list: trainingConfig.models,
		detail: trainingConfig.model,
		infinity: trainingConfig.infiniteModels,
	})

	return {
		useTrainings: api.useEntities,
		useTraining: api.useEntity,
		useInfinitTrainings: api.useInfinityEntities,
		trainingRepository: api.repo,
	}
}

export const createTrainingApi = (http: HttpClientInstance) => {
	const api = createApi<
		Paginated<ITraining>,
		ITraining,
		ICreateTraining,
		IUpdateTraining,
		UseTrainings,
		TrainingID
	>(http, {
		list: trainingConfig.models,
		detail: trainingConfig.model,
		infinity: trainingConfig.infiniteModels,
	})

	return {
		useTrainings: api.useEntities,
		useTraining: api.useEntity,
		useInfinitTrainings: api.useInfinityEntities,
		useCreateTraining: api.useCreateEntity,
		useUpdateTraining: api.useUpdateEntity,
		trainingRepository: api.repo,
	}
}
