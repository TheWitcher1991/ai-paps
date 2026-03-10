import { useMutation } from '@tanstack/react-query'

import {
	BaseRepository,
	createApi,
	createReadonlyApi,
	CrudRepository,
	HttpClientInstance,
	optimisticInvalidateQueries,
	ReadonlyRepository,
} from '@wcsc/toolkit'
import { Paginated, RequestResponse } from '@wcsc/types'

import { datasetConfig } from './dataset.config'
import {
	DatasetID,
	ICreateDataset,
	IDataset,
	IMergeDataset,
	IUpdateDataset,
	UseDatasets,
} from './dataset.types'

export const createReadonlyDatasetRepository = (http: HttpClientInstance) =>
	new ReadonlyRepository<
		Paginated<IDataset>,
		IDataset,
		UseDatasets,
		DatasetID
	>(http, datasetConfig.models)

export const createDatasetRepository = (http: HttpClientInstance) =>
	new CrudRepository<
		Paginated<IDataset>,
		IDataset,
		ICreateDataset,
		IUpdateDataset,
		UseDatasets,
		DatasetID
	>(http, datasetConfig.models)

export const createReadonlyDatasetApi = (http: HttpClientInstance) => {
	const api = createReadonlyApi<
		Paginated<IDataset>,
		IDataset,
		UseDatasets,
		DatasetID
	>(http, {
		list: datasetConfig.models,
		detail: datasetConfig.model,
		infinity: datasetConfig.infiniteModels,
	})

	return {
		useDatasets: api.useEntities,
		useDataset: api.useEntity,
		useInfinitDatasets: api.useInfinityEntities,
		datasetRepository: api.repo,
	}
}

export const createDatasetApi = (http: HttpClientInstance) => {
	const api = createApi<
		Paginated<IDataset>,
		IDataset,
		ICreateDataset,
		IUpdateDataset,
		UseDatasets,
		DatasetID
	>(http, {
		list: datasetConfig.models,
		detail: datasetConfig.model,
		infinity: datasetConfig.infiniteModels,
	})

	return {
		useDatasets: api.useEntities,
		useDataset: api.useEntity,
		useInfinityDatasets: api.useInfinityEntities,
		useCreateDataset: api.useCreateEntity,
		useUpdateDataset: api.useUpdateEntity,
		useDeleteDataset: api.useDeleteEntity,
		datasetRepository: api.repo,
	}
}

class DatasetActionRepository extends BaseRepository {
	async merge(data: IMergeDataset): RequestResponse {
		return this.http.post(`${this.URL}/merge/`, data)
	}
}

export const createDatasetActionRepository = (http: HttpClientInstance) =>
	new DatasetActionRepository(http, datasetConfig.models)

export const createDatasetActionApi = (http: HttpClientInstance) => {
	const datasetActionRepository = createDatasetActionRepository(http)

	const useMergeDataset = () =>
		useMutation({
			mutationFn: (data: IMergeDataset) =>
				datasetActionRepository.merge(data),
			onSuccess: async () => {
				await optimisticInvalidateQueries([[datasetConfig.models]])
			},
		})

	return {
		useMergeDataset,
	}
}
