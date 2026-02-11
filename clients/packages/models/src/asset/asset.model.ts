import { object } from 'valibot'

import { BaseModel, merge, vBrand, vShape } from '@wcsc/toolkit'

export const vAssetId = vBrand(vShape.id, 'AssetID')

export const BaseAssetModel = object({})

export const AssetModel = merge(
	BaseModel,
	BaseAssetModel,
	object({
		id: vAssetId,
	}),
)

export const WriteableAssetModel = merge(BaseAssetModel)
