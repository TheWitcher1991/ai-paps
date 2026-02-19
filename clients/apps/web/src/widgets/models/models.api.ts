import { useModels } from '~models/model'

import { createEntityApi } from '~infra/lib'

export const modelsApi = createEntityApi({
	name: 'models',
	useEntityHook: useModels,
})

export const useModelsStore = modelsApi.useEntityStore
export const ModelsFetcher = modelsApi.EntityFetcher
