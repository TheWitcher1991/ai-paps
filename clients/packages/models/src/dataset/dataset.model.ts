import { ClassModel } from '../class'
import { array, description, number, object } from 'valibot'

import { BaseModel, merge, vBrand, vShape } from '@wcsc/toolkit'

import {
	DatasetFormat,
	DatasetModality,
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
		description: vShape.description,
		source_id: vShape.id,
		source: vShape.enum(DatasetSource),
		status: vShape.enum(DatasetStatus),
		format: vShape.enum(DatasetFormat),
		subset: vShape.enum(DatasetSubset),
		modality: vShape.enum(DatasetModality),
		classes: array(ClassModel),
		size: number(),
		count_assets: number(),
		count_classes: number(),
		count_annotations: number(),
	}),
)

export const WriteableDatasetModel = merge(BaseDatasetModel)
