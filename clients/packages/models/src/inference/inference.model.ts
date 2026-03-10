import { object } from 'valibot'

import { BaseModel, merge, vBrand, vShape } from '@wcsc/toolkit'

export const vInferenceId = vBrand(vShape.id, 'InferenceID')

export const BaseInferenceModel = object({})

export const InferenceModel = merge(
	BaseModel,
	BaseInferenceModel,
	object({
		id: vInferenceId,
	}),
)

export const WriteableInferenceModel = merge(BaseInferenceModel)
