import { object } from 'valibot'

import { BaseModel, merge, vBrand, vShape } from '@wcsc/toolkit'

export const vAnnotationId = vBrand(vShape.id, 'AnnotationID')

export const BaseAnnotationModel = object({})

export const AnnotationModel = merge(
	BaseModel,
	BaseAnnotationModel,
	object({
		id: vAnnotationId,
	}),
)

export const WriteableAnnotationModel = merge(BaseAnnotationModel)
