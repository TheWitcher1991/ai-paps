import { InferenceID } from './inference.types'

export const toInferenceID = (id: number | string): InferenceID =>
	Number(id) as InferenceID
