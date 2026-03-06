import { QueryKey, useMutation, useQuery } from '@tanstack/react-query'

import {
	BaseRepository,
	createApi,
	createReadonlyApi,
	HttpClientInstance,
	optimisticInvalidateQueries,
	ReadonlyRepository,
} from '@wcsc/toolkit'
import { Paginated, RequestResponse } from '@wcsc/types'

import { trainingConfig, trainingRunConfig } from './training.config'
import {
	ICreateTraining,
	ITraining,
	ITrainingRun,
	IUpdateTraining,
	TrainingID,
	TrainingRunID,
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

class TrainingRunRepository extends BaseRepository {
	async start(id: TrainingID): RequestResponse<ITrainingRun> {
		return this.http.post(`${trainingConfig.models}/${id}/start/`)
	}

	async cancel(id: TrainingRunID): RequestResponse<ITrainingRun> {
		return this.http.post(`${trainingRunConfig.models}/${id}/cancel/`)
	}

	async findById(id: TrainingRunID): RequestResponse<ITrainingRun> {
		return await this.http.get(`${trainingRunConfig.models}/${id}/`)
	}
}

export const createTrainingRunRepository = (http: HttpClientInstance) =>
	new TrainingRunRepository(http, trainingConfig.models)

export const createTrainingRunApi = (http: HttpClientInstance) => {
	const trainingRunRepository = createTrainingRunRepository(http)

	const useStartTrainingRun = (id: TrainingID) =>
		useMutation({
			mutationFn: () => trainingRunRepository.start(id),
			onSuccess: async () => {
				await optimisticInvalidateQueries([
					[trainingConfig.models, trainingRunConfig.models],
				])
			},
		})

	const useCancelTrainingRun = (id: TrainingRunID) =>
		useMutation({
			mutationFn: () => trainingRunRepository.cancel(id),
			onSuccess: async () => {
				await optimisticInvalidateQueries([
					[trainingConfig.models, trainingRunConfig.models],
				])
			},
		})

	const useTrainingRun = (id: TrainingRunID) =>
		useQuery({
			queryKey: [trainingRunConfig.model, id] as QueryKey,
			queryFn: () => trainingRunRepository.findById(id),
			enabled: !!id,
		})

	return {
		useTrainingRun,
		useCancelTrainingRun,
		useStartTrainingRun,
		trainingRunRepository,
	}
}
