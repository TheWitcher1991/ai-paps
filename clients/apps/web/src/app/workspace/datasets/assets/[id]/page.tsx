'use client'

import React, { use } from 'react'

import Asset from '~widgets/asset'
import { setBreadcrumbs } from '~widgets/nav'

import { useAsset } from '~models/asset'

import { DataLoader } from '~infra/lib'
import { Group } from '~infra/ui'

import { useMount } from '@wcsc/hooks'
import { IAsset, toAssetID } from '@wcsc/models'
import { generateBreadcrumbs } from '@wcsc/toolkit'

export default function AssetPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = use(params)

	const { isLoading, isError, data } = useAsset(toAssetID(id))

	useMount(() => setBreadcrumbs(generateBreadcrumbs('assets', 'view')))

	return (
		<Group>
			<DataLoader isLoading={isLoading} hasError={isError}>
				<Asset asset={data?.data as IAsset} />
			</DataLoader>
		</Group>
	)
}
