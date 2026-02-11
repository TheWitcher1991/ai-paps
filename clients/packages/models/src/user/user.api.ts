import {
	createReadonlyApi,
	HttpClientInstance,
	ReadonlyRepository,
} from '@wcsc/toolkit'
import { Paginated } from '@wcsc/types'

import { userConfig } from './user.config'
import { IUser, UserID, UseUsers } from './user.types'

export const createReadonlyUserRepository = (http: HttpClientInstance) =>
	new ReadonlyRepository<Paginated<IUser>, IUser, UseUsers, UserID>(
		http,
		userConfig.models,
	)

export const createReadonlyUserApi = (http: HttpClientInstance) => {
	const api = createReadonlyApi<Paginated<IUser>, IUser, UseUsers, UserID>(
		http,
		{
			list: userConfig.models,
			detail: userConfig.model,
			infinity: userConfig.infiniteModels,
		},
	)

	return {
		useUsers: api.useEntities,
		useUser: api.useEntity,
		useInfinitUsers: api.useInfinityEntities,
		userRepository: api.repo,
	}
}
