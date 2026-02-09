import { object } from 'valibot'

import { BaseModel, merge, vBrand, vShape } from '@wcsc/toolkit'

export const vProjectId = vBrand(vShape.id, 'ProjectID')

export const BaseProjectModel = object({})

export const ProjectModel = merge(BaseModel, BaseProjectModel)

export const WriteableProjectModel = merge(BaseProjectModel)
