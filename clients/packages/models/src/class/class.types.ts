import { InferOutput } from 'valibot'

import { Branded, InjectProps, PaginateQuery } from '@wcsc/types'

import { ClassModel, WriteableClassModel } from './class.model'

export type ClassID = Branded<number, 'ClassID'>

export type IClass = InferOutput<typeof ClassModel>

export type ICreateClass = InferOutput<typeof WriteableClassModel>

export type IUpdateClass = Partial<InferOutput<typeof WriteableClassModel>>

export type WithClass = InjectProps<'class', IClass>

export type WithClassID = InjectProps<'class', ClassID>

export type UseClasses = PaginateQuery & {
	view?: string
}
