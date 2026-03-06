import { useEffect, useState } from 'react'

import { http } from '~infra/http'

import { createReadonlyModelApi, IModel } from '@wcsc/models'

const { useModel, useInfinitModels, useModels } = createReadonlyModelApi(http)

export { useModel, useInfinitModels, useModels }

export const useStackModels = () => {
	const [models, setModels] = useState<IModel[]>([])

	const { isLoading, data } = useModels()

	useEffect(() => {
		if (!isLoading && data?.data) {
			setModels(data.data.results)
		}
	}, [isLoading, data])

	return {
		isLoading,
		models,
	}
}
