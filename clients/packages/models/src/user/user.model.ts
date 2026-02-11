import { boolean, object, string } from 'valibot'

import { merge, vBrand, vShape } from '@wcsc/toolkit'

export const vUserId = vBrand(vShape.id, 'UserID')

export const BaseUserModel = object({})

export const UserModel = merge(
	BaseUserModel,
	object({
		id: vUserId,
		username: string(),
		url: string(),
		first_name: string(),
		last_name: string(),
		last_login: vShape.datetime,
		date_joined: vShape.datetime,
		has_analytics_access: boolean(),
	}),
)

export const WriteableUserModel = merge(BaseUserModel)
