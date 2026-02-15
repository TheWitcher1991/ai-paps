'use client'

import { useAssetsStore } from '../assets.hooks'
import { useEffect } from 'react'

import { setCount, setError, setList, setLoading } from '~widgets/assets'

import { useAssets } from '~models/asset'

import { WithAssetID } from '@wcsc/models'

export function AssetsFetcher({ asset }: WithAssetID) {
	const { filter } = useAssetsStore()

	const { data, isLoading, isError } = useAssets({
		...filter,
		asset,
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
