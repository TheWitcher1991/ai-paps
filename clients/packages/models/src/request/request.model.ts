import { object } from 'valibot'

import { BaseModel, merge, vBrand, vShape } from '@wcsc/toolkit'

export const vRequestId = vBrand(vShape.id, 'RequestID')

export const BaseRequestModel = object({})

export const RequestModel = merge(BaseModel, BaseRequestModel)

export const WriteableRequestModel = merge(BaseRequestModel)
