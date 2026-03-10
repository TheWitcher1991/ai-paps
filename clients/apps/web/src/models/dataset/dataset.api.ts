import { useEffect, useState } from 'react'

import { http } from '~infra/http'

import {
	createDatasetActionApi,
	createReadonlyDatasetApi,
	IDataset,
} from '@wcsc/models'

const { useDataset, useInfinitDatasets, useDatasets } =
	createReadonlyDatasetApi(http)

export { useDataset, useInfinitDatasets, useDatasets }

const { useMergeDataset } = createDatasetActionApi(http)

export { useMergeDataset }

export const useStackDatasets = () => {
	const [datasets, setDatasets] = useState<IDataset[]>([])

	const { isLoading, data } = useDatasets()

	useEffect(() => {
		if (!isLoading && data?.data) {
			setDatasets(data.data.results)
		}
	}, [isLoading, data])

	return {
		isLoading,
		datasets,
	}
}
