'use client'

import { useEffect } from 'react'

import {
	setCount,
	setError,
	setList,
	setLoading,
	useTrainingsStore,
} from '~widgets/trainings'

import { useTrainings } from '~models/training'

export function TrainingsFetcher() {
	const { filter } = useTrainingsStore()

	const { data, isLoading, isError } = useTrainings(filter)

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
