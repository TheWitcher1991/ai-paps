'use client'
import { Button, Icon } from '@gravity-ui/uikit'
import { GearBranches } from '@gravity-ui/icons'

import { ModelsIndicators } from '~widgets/dashkit/models-indicators'
import Models, {
	ModelsFetcher,
	ModelsFilter,
	ModelsPagination,
} from '~widgets/models'
import { setBreadcrumbs } from '~widgets/nav'

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
				action={
					<Button type={'button'} view={'action'} size={'l'}>
						<Icon data={GearBranches} size={16} />
						Новое обучение
					</Button>
				}
			/>
			<ModelsIndicators />
			<ModelsFilter />
			<Models />
			<ModelsFetcher />
			<ModelsPagination />
		</Group>
	)
}
