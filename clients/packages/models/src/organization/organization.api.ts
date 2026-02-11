import {
	createReadonlyApi,
	HttpClientInstance,
	ReadonlyRepository,
} from '@wcsc/toolkit'
import { Paginated } from '@wcsc/types'

import { organizationConfig } from './organization.config'
import {
	IOrganization,
	OrganizationID,
	UseOrganizations,
} from './organization.types'

export const createReadonlyOrganizationRepository = (
	http: HttpClientInstance,
) =>
	new ReadonlyRepository<
		Paginated<IOrganization>,
		IOrganization,
		UseOrganizations,
		OrganizationID
	>(http, organizationConfig.models)

export const createReadonlyOrganizationApi = (http: HttpClientInstance) => {
	const api = createReadonlyApi<
		Paginated<IOrganization>,
		IOrganization,
		UseOrganizations,
		OrganizationID
	>(http, {
		list: organizationConfig.models,
		detail: organizationConfig.model,
		infinity: organizationConfig.infiniteModels,
	})

	return {
		useOrganizations: api.useEntities,
		useOrganization: api.useEntity,
		useInfinitOrganizations: api.useInfinityEntities,
		organizationRepository: api.repo,
	}
}
