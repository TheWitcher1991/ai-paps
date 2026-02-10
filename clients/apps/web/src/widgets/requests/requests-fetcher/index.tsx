'use client'

import { useRequestsStore } from '../requests.hooks'
import { useEffect } from 'react'

import { setCount, setError, setList, setLoading } from '~widgets/requests'

import { useRequests } from '~models/request'

export function RequestsFetcher() {
	const { filter } = useRequestsStore()

	const { data, isLoading, isError } = useRequests(filter)

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
