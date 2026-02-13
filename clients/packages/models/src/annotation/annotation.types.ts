import { InferOutput } from 'valibot'

import { Branded, InjectProps, PaginateQuery } from '@wcsc/types'

import { AnnotationModel, WriteableAnnotationModel } from './annotation.model'

export type AnnotationID = Branded<number, 'AnnotationID'>

export type IAnnotation = InferOutput<typeof AnnotationModel>

export type ICreateAnnotation = InferOutput<typeof WriteableAnnotationModel>

export type IUpdateAnnotation = Partial<
	InferOutput<typeof WriteableAnnotationModel>
>

export type WithAnnotation = InjectProps<'annotation', IAnnotation>

export type WithAnnotationID = InjectProps<'annotation', AnnotationID>

export type UseAnnotations = PaginateQuery & {
	view?: string
}
