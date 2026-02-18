import { object, string } from 'valibot'

import { BaseModel, merge, vBrand, vShape } from '@wcsc/toolkit'
import { vProjectId } from '../project'
import { AssigneeModel } from '../user'
import { vOrganizationId } from '../organization'

export const vTaskId = vBrand(vShape.id, 'TaskID')

export const BaseTaskModel = object({})

export const TaskModel = merge(
	BaseModel,
	BaseTaskModel,
	object({
		id: vTaskId,
		jobs: object({
			completed: vShape.positive,
			validation: vShape.positive,
			count: vShape.positive,
			url: vShape.url,
		}),
		labels: object({
			url: vShape.url,
		}),
		url: vShape.url,
		name: vShape.name,
		project_id: vProjectId,
		mode: string(),
		owner: AssigneeModel,
		assignee: AssigneeModel,
		bug_tracker: string(),
		overlap: vShape.positive,
		segment_size: vShape.positive,
		status: string(),
		date_chuck_size: vShape.positive,
		data_original_chuck_type: vShape.positive,
		data_compressed_chuck_type: vShape.positive,
		date_cloud_storate_id: vShape.id,
		guide_id: vShape.id,
		size: vShape.positive,
		image_quality: vShape.positive,
		data: vShape.positive,
		dimension: string(),
		subset: string(),
		organization_id: vOrganizationId,
		assignee_updated_date: vShape.datetime,
		validation_mode: string(),
	}),
)

export const WriteableTaskModel = merge(BaseTaskModel)
