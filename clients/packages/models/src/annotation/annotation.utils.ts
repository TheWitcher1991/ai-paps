import { AnnotationID } from './annotation.types'

export const toAnnotationID = (id: number | string): AnnotationID =>
	Number(id) as AnnotationID
