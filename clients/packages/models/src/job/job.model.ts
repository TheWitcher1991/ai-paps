import { object, string } from 'valibot'

import { BaseModel, merge, vBrand, vShape } from '@wcsc/toolkit'
import { vTaskId } from '../task'
import { vProjectId } from '../project'
import { AssigneeModel } from '../user'

export const vJobId = vBrand(vShape.id, 'JobID')

export const BaseJobModel = object({})

export const JobModel = merge(
	BaseModel,
	BaseJobModel,
	object({
		id: vJobId,
		issues: object({
			url: vShape.url,
			count: vShape.positive
		}),
		labels: object({
			url: vShape.url
		}),
		task_id: vTaskId,
		project_id: vProjectId,
		assignee: AssigneeModel,
		guide_id: vShape.id,
		dimension: string(),
		bug_tracker: string(),
		status: string(),
		stage: string(),
		mode: string(),
		frame_count: vShape.positive,
		start_frame: vShape.positive,
		stop_frame: vShape.positive,
		data_chunk_size: vShape.positive,
		data_compressed_size: vShape.positive,
		data_original_chuck_type: vShape.positive,
		type: string(),
		assignee_updated_date: vShape.datetime,
		parent_job_id: vJobId,
		consensus_replicas: vShape.positive
	}),
)

export const WriteableJobModel = merge(BaseJobModel)
