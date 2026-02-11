import { object } from 'valibot'

import { BaseModel, merge, vBrand, vShape } from '@wcsc/toolkit'

export const vDatasetId = vBrand(vShape.id, 'DatasetID')

export const BaseDatasetModel = object({})

export const DatasetModel = merge(BaseModel, BaseDatasetModel)

export const WriteableDatasetModel = merge(BaseDatasetModel)
