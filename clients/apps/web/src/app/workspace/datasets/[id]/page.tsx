'use client'

import React, { use } from 'react'

import Assets, {
	AssetsFetcher,
	AssetsFilter,
	AssetsPagination,
} from '~widgets/assets'
import { AssetsIndicators } from '~widgets/dashkit/assets-indicators'
import { setBreadcrumbs } from '~widgets/nav'

import { Group, PageTitle } from '~infra/ui'

import { useMount } from '@wcsc/hooks'
import { toDatasetID } from '@wcsc/models'
import { generateBreadcrumbs } from '@wcsc/toolkit'

export default function AssetsPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = use(params)

	useMount(() => setBreadcrumbs(generateBreadcrumbs('datasets', 'view')))

	return (
		<Group>
			<PageTitle
				title={'Датасет'}
				subtitle={
					'Панель мониторинга и управления ключевыми метриками системы'
				}
			/>
			<AssetsIndicators />
			<AssetsFilter />
			<Assets />
			<AssetsFetcher dataset={toDatasetID(id)} />
			<AssetsPagination />
		</Group>
	)
}
