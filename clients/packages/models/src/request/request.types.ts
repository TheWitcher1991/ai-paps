import { InferOutput } from 'valibot'

import { Branded, InjectProps, PaginateQuery } from '@wcsc/types'

import { RequestModel, WriteableRequestModel } from './request.model'

export type RequestID = Branded<number, 'RequestID'>

export type IRequest = InferOutput<typeof RequestModel>

export type ICreateRequest = InferOutput<typeof WriteableRequestModel>

export type IUpdateRequest = Partial<InferOutput<typeof WriteableRequestModel>>

export type WithRequest = InjectProps<'request', IRequest>

export type WithRequestID = InjectProps<'request', RequestID>

export type UseRequests = PaginateQuery & {
	view?: string
}
