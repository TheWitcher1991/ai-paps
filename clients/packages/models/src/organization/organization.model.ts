import { object } from 'valibot'

import { BaseModel, merge, vBrand, vShape } from '@wcsc/toolkit'

export const vOrganizationId = vBrand(vShape.id, 'OrganizationID')

export const BaseOrganizationModel = object({})

export const OrganizationModel = merge(
	BaseModel,
	BaseOrganizationModel,
	object({
		id: vOrganizationId,
	}),
)

export const WriteableOrganizationModel = merge(BaseOrganizationModel)
