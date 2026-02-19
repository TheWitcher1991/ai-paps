import {
	createReadonlyApi,
	HttpClientInstance,
	ReadonlyRepository,
} from '@wcsc/toolkit'
import { Paginated } from '@wcsc/types'

import { modelConfig } from './model.config'
import { IModel, ModelID, UseModels } from './model.types'

export const createReadonlyModelRepository = (http: HttpClientInstance) =>
	new ReadonlyRepository<Paginated<IModel>, IModel, UseModels, ModelID>(
		http,
		modelConfig.models,
	)

export const createReadonlyModelApi = (http: HttpClientInstance) => {
	const api = createReadonlyApi<
		Paginated<IModel>,
		IModel,
		UseModels,
		ModelID
	>(http, {
		list: modelConfig.models,
		detail: modelConfig.model,
		infinity: modelConfig.infiniteModels,
	})

	return {
		useModels: api.useEntities,
		useModel: api.useEntity,
		useInfinitModels: api.useInfinityEntities,
		modelRepository: api.repo,
	}
}
