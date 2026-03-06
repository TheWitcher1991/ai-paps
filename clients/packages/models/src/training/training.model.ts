import { boolean, object } from 'valibot'

import { BaseModel, merge, vBrand, vShape } from '@wcsc/toolkit'

export const vTrainingId = vBrand(vShape.id, 'TrainingID')

export const vTrainingConfigId = vBrand(vShape.id, 'TrainingID')

export const BaseTrainingModel = object({})

export const TrainingModel = merge(
	BaseModel,
	BaseTrainingModel,
	object({
		id: vTrainingId,
	}),
)

export const WriteableTrainingModel = merge(BaseTrainingModel)

export const BaseTrainingConfigModel = object({})

export const TrainingConfigModel = merge(
	BaseModel,
	BaseTrainingConfigModel,
	object({
		id: vTrainingConfigId,
	}),
)

export const WriteableTrainingConfigModel = merge(BaseTrainingModel)
