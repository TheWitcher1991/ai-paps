import { OrganizationID } from './organization.types'

export const toOrganizationID = (id: number | string): OrganizationID =>
	Number(id) as OrganizationID
