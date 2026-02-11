import {
	createApi,
	createReadonlyApi,
	CrudRepository,
	HttpClientInstance,
	ReadonlyRepository,
} from '@wcsc/toolkit'
import { Paginated } from '@wcsc/types'

import { datasetConfig } from './dataset.config'
import {
	DatasetID,
	ICreateDataset,
	IDataset,
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
