'use client'

import { GearBranches } from '@gravity-ui/icons'
import { Button, Icon } from '@gravity-ui/uikit'

import { TrainingsIndicators } from '~widgets/dashkit/trainings-indicators'
import { setBreadcrumbs } from '~widgets/nav'
import Trainings, {
	TrainingsFetcher,
	TrainingsFilter,
	TrainingsPagination,
	TrainingsWider,
} from '~widgets/trainings'

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
				action={
					<Button type={'button'} view={'action'} size={'l'}>
						<Icon data={GearBranches} size={16} />
						Новое обучение
					</Button>
				}
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
