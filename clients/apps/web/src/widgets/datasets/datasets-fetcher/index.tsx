'use client'

import { useDatasetsStore } from '../datasets.hooks'
import { useEffect } from 'react'

import { setCount, setError, setList, setLoading } from '~widgets/datasets'

import { useDatasets } from '~models/dataset'

export function DatasetsFetcher() {
	const { filter } = useDatasetsStore()

	const { data, isLoading, isError } = useDatasets(filter)

	useEffect(() => {
		setLoading(isLoading)
		setError(isError)
		if (!isLoading && data?.data) {
			setCount(data.data.count)
			setList(data.data.results)
		}
	}, [data, isLoading, isError])

	return null
}
