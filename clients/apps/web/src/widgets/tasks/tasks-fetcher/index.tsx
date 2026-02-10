'use client'

import { useTasksStore } from '../tasks.hooks'
import { useEffect } from 'react'

import { setCount, setError, setList, setLoading } from '~widgets/tasks'

import { useTasks } from '~models/task'

export function TasksFetcher() {
	const { filter } = useTasksStore()

	const { data, isLoading, isError } = useTasks(filter)

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
