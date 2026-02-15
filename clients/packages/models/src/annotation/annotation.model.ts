import { ClassModel } from '../class'
import { boolean, object } from 'valibot'

import { BaseModel, merge, vBrand, vShape } from '@wcsc/toolkit'

export const vAnnotationId = vBrand(vShape.id, 'AnnotationID')

export const BaseAnnotationModel = object({})

export const AnnotationModel = merge(
	BaseModel,
	BaseAnnotationModel,
	object({
		id: vAnnotationId,
		cls: ClassModel,
		segmentation: vShape.json,
		bbox: vShape.json,
		area: vShape.datetime,
		iscrowd: boolean(),
	}),
)

export const WriteableAnnotationModel = merge(BaseAnnotationModel)
