import { InferOutput } from 'valibot'

import { Branded, InjectProps, PaginateQuery } from '@wcsc/types'

import { ModelFramework, ModelSubset } from './model.enums'
import { ModelModel, WriteableModelModel } from './model.model'

export type ModelID = Branded<number, 'ModelID'>

export type IModel = InferOutput<typeof ModelModel>

export type ICreateModel = InferOutput<typeof WriteableModelModel>

export type IUpdateModel = Partial<InferOutput<typeof WriteableModelModel>>

export type WithModel = InjectProps<'model', IModel>

export type WithModelID = InjectProps<'model', ModelID>

export type UseModels = PaginateQuery & {
	subset: ModelSubset
	framework: ModelFramework
}
