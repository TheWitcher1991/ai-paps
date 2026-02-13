import {
	createReadonlyApi,
	HttpClientInstance,
	ReadonlyRepository,
} from '@wcsc/toolkit'
import { Paginated } from '@wcsc/types'

import { classConfig } from './class.config'
import { ClassID, IClass, UseClasses } from './class.types'

export const createReadonlyClassRepository = (http: HttpClientInstance) =>
	new ReadonlyRepository<Paginated<IClass>, IClass, UseClasses, ClassID>(
		http,
		classConfig.models,
	)

export const createReadonlyClassApi = (http: HttpClientInstance) => {
	const api = createReadonlyApi<
		Paginated<IClass>,
		IClass,
		UseClasses,
		ClassID
	>(http, {
		list: classConfig.models,
		detail: classConfig.model,
		infinity: classConfig.infiniteModels,
	})

	return {
		UseClasses: api.useEntities,
		useClass: api.useEntity,
		useInfinitClasses: api.useInfinityEntities,
		classRepository: api.repo,
	}
}
