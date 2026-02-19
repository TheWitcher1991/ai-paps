'use client'

import { DatasetsIndicators } from '~widgets/dashkit/datasets-indicators'
import Datasets, {
	DatasetsFetcher,
	DatasetsFilter,
	DatasetsPagination,
} from '~widgets/datasets'
import { setBreadcrumbs } from '~widgets/nav'

import { DatasetUnionButton } from '~models/dataset'

import { Group, PageTitle } from '~infra/ui'

import { useMount } from '@wcsc/hooks'
import { generateBreadcrumbs } from '@wcsc/toolkit'

export default function DatasetsPage() {
	useMount(() => setBreadcrumbs(generateBreadcrumbs('datasets')))

	return (
		<Group>
			<PageTitle
				title={'Датасеты'}
				subtitle={
					'Панель мониторинга и управления ключевыми метриками системы'
				}
				action={<DatasetUnionButton />}
			/>
			<DatasetsIndicators />
			<DatasetsFilter />
			<Datasets />
			<DatasetsFetcher />
			<DatasetsPagination />
		</Group>
	)
}
