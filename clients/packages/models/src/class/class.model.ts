import { object } from 'valibot'

import { BaseModel, merge, vBrand, vShape } from '@wcsc/toolkit'

export const vClassId = vBrand(vShape.id, 'ClassID')

export const BaseClassModel = object({})

export const ClassModel = merge(
	BaseModel,
	BaseClassModel,
	object({
		id: vClassId,
	}),
)

export const WriteableClassModel = merge(BaseClassModel)
