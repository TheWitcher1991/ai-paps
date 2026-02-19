import { useUnit } from 'effector-react'
import { useEffect } from 'react'

import { createModelListApi } from '@wcsc/toolkit'

interface EntityApiConfig<TEntity, TFilter = any> {
	name: string
	useEntityHook: (filter: TFilter) => {
		data?: { data: { count: number; results: TEntity[] } }
		isLoading: boolean
		isError: boolean
	}
	defaultPageSize?: number
}

export function createEntityApi<TEntity, TFilter = any>({
	name,
	useEntityHook,
	defaultPageSize = 25,
}: EntityApiConfig<TEntity, TFilter>) {
	const api = createModelListApi<TEntity, any>({
		count: 0,
		list: [],
		checked: [],
		error: false,
		loading: true,
		filter: {
			page_size: defaultPageSize,
			page: 1,
		} as TFilter,
	})

	const useEntityStore = () => useUnit(api.$store)

	function EntityFetcher() {
		const { filter } = useEntityStore()
		const { data, isLoading, isError } = useEntityHook(filter)

		useEffect(() => {
			api.setLoading(isLoading)
			api.setError(isError)
			if (!isLoading && data?.data) {
				api.setCount(data.data.count)
				api.setList(data.data.results)
			}
		}, [data, isLoading, isError])

		return null
	}

	return {
		...api,
		useEntityStore,
		EntityFetcher,
	}
}
