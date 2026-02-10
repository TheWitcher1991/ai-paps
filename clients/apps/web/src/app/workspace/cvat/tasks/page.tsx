'use client'

import { setBreadcrumbs } from '~widgets/nav'
import Tasks, {
	TasksFetcher,
	TasksFilter,
	TasksPagination,
} from '~widgets/tasks'

import { CvatSegmented } from '~features/cvat'

import { Group, PageTitle } from '~infra/ui'

import { useMount } from '@wcsc/hooks'
import { href } from '@wcsc/href'

export default function TasksPage() {
	useMount(() =>
		setBreadcrumbs([{ text: 'Задачи', href: href.cvat.tasks.index }]),
	)

	return (
		<Group>
			<CvatSegmented />
			<PageTitle
				title={'Задачи'}
				subtitle={
					'Задачи - это основная сущность системы, которая позволяет организовать работу команд'
				}
			/>
			<TasksFilter />
			<Tasks />
			<TasksFetcher />
			<TasksPagination />
		</Group>
	)
}
