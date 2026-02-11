import { InferOutput } from 'valibot'

import { Branded, InjectProps, PaginateQuery } from '@wcsc/types'

import { UserModel, WriteableUserModel } from './user.model'

export type UserID = Branded<number, 'UserID'>

export type IUser = InferOutput<typeof UserModel>

export type ICreateUser = InferOutput<typeof WriteableUserModel>

export type IUpdateUser = Partial<InferOutput<typeof WriteableUserModel>>

export type WithUser = InjectProps<'user', IUser>

export type WithUserID = InjectProps<'user', UserID>

export type UseUsers = PaginateQuery & {
	view?: string
}
