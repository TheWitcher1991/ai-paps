import { object } from 'valibot'

import { BaseModel, merge, vBrand, vShape } from '@wcsc/toolkit'

export const vJobId = vBrand(vShape.id, 'JobID')

export const BaseJobModel = object({})

export const JobModel = merge(BaseModel, BaseJobModel)

export const WriteableJobModel = merge(BaseJobModel)
