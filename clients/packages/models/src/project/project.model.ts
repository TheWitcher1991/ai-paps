import { object, string } from 'valibot'

import { BaseModel, merge, vBrand, vShape } from '@wcsc/toolkit'
import { AssigneeModel } from '../user'
import { vOrganizationId } from '../organization'

export const vProjectId = vBrand(vShape.id, 'ProjectID')

export const BaseProjectModel = object({})

export const ProjectModel = merge(
	BaseModel,
	BaseProjectModel,
	object({
		id: vProjectId,
		tasks: object({
			count: vShape.positive,
			url: vShape.url,
		}),
		labels: object({
			url: vShape.url,
		}),
		url: vShape.url,
		name: string(),
		owner: AssigneeModel,
		assignee: AssigneeModel,
		guide_id: vShape.id,
		bug_tracker: string(),
		status: string(),
		dimension: string(),
		organization: vOrganizationId,
		assignee_updated_date: vShape.datetime,
	}),
)

export const WriteableProjectModel = merge(BaseProjectModel)
