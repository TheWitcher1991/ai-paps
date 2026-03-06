'use client'

import { ModelsIndicators } from '~widgets/dashkit/models-indicators'
import Models, {
	ModelsFetcher,
	ModelsFilter,
	ModelsPagination,
	ModelsWider,
} from '~widgets/models'
import { setBreadcrumbs } from '~widgets/nav'

import { TrainingCreateButton } from '~models/training'

import { Group, PageTitle } from '~infra/ui'

import { useMount } from '@wcsc/hooks'
import { generateBreadcrumbs } from '@wcsc/toolkit'

export default function ModelsPage() {
	useMount(() => setBreadcrumbs(generateBreadcrumbs('models')))

	return (
		<Group>
			<PageTitle
				title={'Нейронные сети'}
				subtitle={
					'Работа с обучением и инференсом моделей машинного обучения'
				}
				action={<TrainingCreateButton />}
			/>
			<ModelsIndicators />
			<ModelsFilter />
			<ModelsWider />
			<Models />
			<ModelsFetcher />
			<ModelsPagination />
		</Group>
	)
}
