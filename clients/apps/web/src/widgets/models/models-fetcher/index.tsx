'use client'

import { useModelsStore } from '../models.hooks'
import { useEffect } from 'react'

import { setCount, setError, setList, setLoading } from '~widgets/models'

import { useModels } from '~models/model'

export function ModelsFetcher() {
	const { filter } = useModelsStore()

	const { data, isLoading, isError } = useModels(filter)

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
