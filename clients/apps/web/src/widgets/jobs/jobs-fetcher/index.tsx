'use client'

import { useJobsStore } from '../jobs.hooks'
import { useEffect } from 'react'

import { setCount, setError, setList, setLoading } from '~widgets/jobs'

import { useJobs } from '~models/job'

export function JobsFetcher() {
	const { filter } = useJobsStore()

	const { data, isLoading, isError } = useJobs(filter)

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
