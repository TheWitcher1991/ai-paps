import { InferOutput } from 'valibot'

import { Branded, InjectProps, PaginateQuery } from '@wcsc/types'

import {
	OrganizationModel,
	WriteableOrganizationModel,
} from './organization.model'

export type OrganizationID = Branded<number, 'OrganizationID'>

export type IOrganization = InferOutput<typeof OrganizationModel>

export type ICreateOrganization = InferOutput<typeof WriteableOrganizationModel>

export type IUpdateOrganization = Partial<
	InferOutput<typeof WriteableOrganizationModel>
>

export type WithOrganization = InjectProps<'organization', IOrganization>

export type WithOrganizationID = InjectProps<'organization', OrganizationID>

export type UseOrganizations = PaginateQuery & {
	view?: string
}
