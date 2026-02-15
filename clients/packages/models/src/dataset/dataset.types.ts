import { InferOutput } from 'valibot'

import { Branded, InjectProps, PaginateQuery } from '@wcsc/types'

import {
	DatasetFormat,
	DatasetSource,
	DatasetStatus,
	DatasetSubset,
} from './dataset.enums'
import { DatasetModel, WriteableDatasetModel } from './dataset.model'

export type DatasetID = Branded<number, 'DatasetID'>

export type IDataset = InferOutput<typeof DatasetModel>

export type ICreateDataset = InferOutput<typeof WriteableDatasetModel>

export type IUpdateDataset = Partial<InferOutput<typeof WriteableDatasetModel>>

export type WithDataset = InjectProps<'dataset', IDataset>

export type WithDatasetID = InjectProps<'dataset', DatasetID>

export type UseDatasets = PaginateQuery & {
	source: DatasetSource
	status: DatasetStatus
	format: DatasetFormat
	subset: DatasetSubset
	view?: string
}
