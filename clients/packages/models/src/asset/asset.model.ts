import { AnnotationModel } from '../annotation'
import { array, number, object } from 'valibot'

import { BaseModel, merge, vBrand, vShape } from '@wcsc/toolkit'

export const vAssetId = vBrand(vShape.id, 'AssetID')

export const BaseAssetModel = object({})

export const AssetModel = merge(
	BaseModel,
	BaseAssetModel,
	object({
		id: vAssetId,
		annotations: array(AnnotationModel),
		file: vShape.url,
		width: number(),
		height: number(),
		source_id: vShape.id,
	}),
)

export const WriteableAssetModel = merge(BaseAssetModel)
