'use client'

import { TrainingsIndicators } from '~widgets/dashkit/trainings-indicators'
import { setBreadcrumbs } from '~widgets/nav'
import Trainings, {
	TrainingsFetcher,
	TrainingsFilter,
	TrainingsPagination,
	TrainingsWider,
} from '~widgets/trainings'

import { TrainingCreateButton } from '~models/training'

import { Group, PageTitle } from '~infra/ui'

import { useMount } from '@wcsc/hooks'
import { generateBreadcrumbs } from '@wcsc/toolkit'

export default function TrainingsPage() {
	useMount(() => setBreadcrumbs(generateBreadcrumbs('trainings')))

	return (
		<Group>
			<PageTitle
				title={'Обучения'}
				subtitle={'Все запуски обучения моделей'}
				action={<TrainingCreateButton />}
			/>
			<TrainingsIndicators />
			<TrainingsFilter />
			<TrainingsWider />
			<Trainings />
			<TrainingsFetcher />
			<TrainingsPagination />
		</Group>
	)
}
