'use client'

import { useAssetsStore } from '../assets.hooks'
import { useEffect } from 'react'

import { setCount, setError, setList, setLoading } from '~widgets/assets'

import { useAssets } from '~models/asset'

import { WithDatasetID } from '@wcsc/models'

export function AssetsFetcher({ dataset }: WithDatasetID) {
	const { filter } = useAssetsStore()

	const { data, isLoading, isError } = useAssets({
		...filter,
		dataset,
	})

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
