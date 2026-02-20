'use client'

import { useUsersStore } from '../users.hooks'
import { useEffect } from 'react'

import { setCount, setError, setList, setLoading } from '~widgets/users'

import { useUsers } from '~models/user'

export function UsersFetcher() {
	const { filter } = useUsersStore()

	const { data, isLoading, isError } = useUsers(filter)

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
