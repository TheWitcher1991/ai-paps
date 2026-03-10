import { InferOutput } from 'valibot'

import { Branded, InjectProps, PaginateQuery } from '@wcsc/types'

import { InferenceModel, WriteableInferenceModel } from './inference.model'

export type InferenceID = Branded<number, 'InferenceID'>

export type IInference = InferOutput<typeof InferenceModel>

export type ICreateInference = InferOutput<typeof WriteableInferenceModel>

export type IUpdateInference = Partial<
	InferOutput<typeof WriteableInferenceModel>
>

export type WithInference = InjectProps<'inference', IInference>

export type WithInferenceID = InjectProps<'inference', InferenceID>

export type UseInferences = PaginateQuery & {
	view?: string
}

export type IPredictionResult = {
	mask: number[]
	shape: number[]
	confidence?: number
}

export type ModelID = Branded<number, 'ModelID'>
