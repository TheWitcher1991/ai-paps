import {
	createApi,
	createReadonlyApi,
	CrudRepository,
	HttpClientInstance,
	ReadonlyRepository,
} from '@wcsc/toolkit'
import { Paginated } from '@wcsc/types'

import { assetConfig } from './asset.config'
import {
	AssetID,
	IAsset,
	ICreateAsset,
	IUpdateAsset,
	UseAssets,
} from './asset.types'

export const createReadonlyAssettRepository = (http: HttpClientInstance) =>
	new ReadonlyRepository<Paginated<IAsset>, IAsset, UseAssets, AssetID>(
		http,
		assetConfig.models,
	)

export const createAssetRepository = (http: HttpClientInstance) =>
	new CrudRepository<
		Paginated<IAsset>,
		IAsset,
		ICreateAsset,
		IUpdateAsset,
		UseAssets,
		AssetID
	>(http, assetConfig.models)

export const createReadonlyAssetApi = (http: HttpClientInstance) => {
	const api = createReadonlyApi<
		Paginated<IAsset>,
		IAsset,
		UseAssets,
		AssetID
	>(http, {
		list: assetConfig.models,
		detail: assetConfig.model,
		infinity: assetConfig.infiniteModels,
	})

	return {
		useAssets: api.useEntities,
		useAsset: api.useEntity,
		useInfinitAssets: api.useInfinityEntities,
		assetRepository: api.repo,
	}
}

export const createAssetApi = (http: HttpClientInstance) => {
	const api = createApi<
		Paginated<IAsset>,
		IAsset,
		ICreateAsset,
		IUpdateAsset,
		UseAssets,
		AssetID
	>(http, {
		list: assetConfig.models,
		detail: assetConfig.model,
		infinity: assetConfig.infiniteModels,
	})

	return {
		useAssets: api.useEntities,
		useAsset: api.useEntity,
		useInfinitAssets: api.useInfinityEntities,
		useCreateAsset: api.useCreateEntity,
		useUpdateAsset: api.useUpdateEntity,
		useDeleteAsset: api.useDeleteEntity,
		assetRepository: api.repo,
	}
}
