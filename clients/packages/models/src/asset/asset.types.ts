import { InferOutput } from 'valibot'

import { Branded, InjectProps, PaginateQuery } from '@wcsc/types'

import { AssetModel, WriteableAssetModel } from './asset.model'

export type AssetID = Branded<number, 'AssetID'>

export type IAsset = InferOutput<typeof AssetModel>

export type ICreateAsset = InferOutput<typeof WriteableAssetModel>

export type IUpdateAsset = Partial<InferOutput<typeof WriteableAssetModel>>

export type WithAsset = InjectProps<'asset', IAsset>

export type WithAssetID = InjectProps<'asset', AssetID>

export type UseDAssets = PaginateQuery & {
	view?: string
}

export type UseAssets = PaginateQuery & {
	view?: string
}
