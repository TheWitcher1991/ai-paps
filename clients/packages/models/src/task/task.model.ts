import { object } from 'valibot'

import { BaseModel, merge, vBrand, vShape } from '@wcsc/toolkit'

export const vTaskId = vBrand(vShape.id, 'TaskID')

export const BaseTaskModel = object({})

export const TaskModel = merge(
	BaseModel,
	BaseTaskModel,
	object({
		id: vTaskId,
	}),
)

export const WriteableTaskModel = merge(BaseTaskModel)
