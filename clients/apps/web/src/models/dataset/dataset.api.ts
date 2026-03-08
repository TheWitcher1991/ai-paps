import { http } from '~infra/http'

import { createReadonlyDatasetApi, IDataset } from '@wcsc/models'
import { useEffect, useState } from 'react'

const { useDataset, useInfinitDatasets, useDatasets } =
	createReadonlyDatasetApi(http)

export { useDataset, useInfinitDatasets, useDatasets }

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