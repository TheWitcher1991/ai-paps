import { IAsset, UseAssets } from '@wcsc/models'
import { createModelListApi } from '@wcsc/toolkit'

export const {
	setCount,
	setList,
	setFilter,
	setLoading,
	setError,
	reset,
	changeQueryFromInput,
	$store,
} = createModelListApi<IAsset, UseAssets>({
	count: 0,
	list: [],
	checked: [],
	error: false,
	loading: true,
	filter: {
		page_size: 25,
		page: 1,
		view: 'table',
	},
})
