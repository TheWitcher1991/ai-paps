import { RequestID } from './request.types'

export const toRequestID = (id: number | string): RequestID =>
	Number(id) as RequestID
