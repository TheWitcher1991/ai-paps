import { boolean, object } from 'valibot'

import { BaseModel, merge, vBrand, vShape } from '@wcsc/toolkit'

import {
	ModelArchitecture,
	ModelBackbone,
	ModelFramework,
	ModelSubset,
} from './model.enums'

export const vModelId = vBrand(vShape.id, 'ModelID')

export const BaseModelModel = object({})

export const ModelModel = merge(
	BaseModel,
	BaseModelModel,
	object({
		id: vModelId,
		name: vShape.title,
		alias: vShape.title,
		description: vShape.description,
		file: vShape.url,
		subset: vShape.enum(ModelSubset),
		architecture: vShape.enum(ModelArchitecture),
		framework: vShape.enum(ModelFramework),
		backbone: vShape.enum(ModelBackbone),
		deployed: boolean(),
	}),
)

export const WriteableModelModel = merge(BaseModelModel)
