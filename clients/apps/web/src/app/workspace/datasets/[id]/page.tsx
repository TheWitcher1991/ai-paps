'use client'

import React, { use } from 'react'

import { setBreadcrumbs } from '~widgets/nav'

import { DatasetUnionButton } from '~models/dataset'

import { Group, PageTitle } from '~infra/ui'

import { useMount } from '@wcsc/hooks'
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
				action={<DatasetUnionButton />}
			/>
		</Group>
	)
}
