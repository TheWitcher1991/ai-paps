import { ClassModel } from '../class'
import { array, object } from 'valibot'

import { BaseModel, merge, vBrand, vShape } from '@wcsc/toolkit'

import {
	DatasetFormat,
	DatasetSource,
	DatasetStatus,
	DatasetSubset,
} from './dataset.enums'

export const vDatasetId = vBrand(vShape.id, 'DatasetID')

export const BaseDatasetModel = object({})

export const DatasetModel = merge(
	BaseModel,
	BaseDatasetModel,
	object({
		id: vDatasetId,
		name: vShape.title,
		source_id: vShape.id,
		source: vShape.enum(DatasetSource),
		status: vShape.enum(DatasetStatus),
		format: vShape.enum(DatasetFormat),
		subset: vShape.enum(DatasetSubset),
		classes: array(ClassModel),
	}),
)

export const WriteableDatasetModel = merge(BaseDatasetModel)
