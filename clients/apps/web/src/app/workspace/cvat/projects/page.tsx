'use client'

import { setBreadcrumbs } from '~widgets/nav'
import Projects, {
	ProjectsFetcher,
	ProjectsFilter,
	ProjectsPagination,
} from '~widgets/projects'

import { CvatSegmented } from '~features/cvat'

import { ProjectCreateButton } from '~models/project'

import { Group, PageTitle } from '~infra/ui'

import { useMount } from '@wcsc/hooks'
import { href } from '@wcsc/href'

export default function ProjectsPage() {
	useMount(() =>
		setBreadcrumbs([{ text: 'Проекты', href: href.cvat.projects.index }]),
	)

	return (
		<Group>
			<CvatSegmented />
			<PageTitle
				title={'Проекты'}
				subtitle={
					'Проекты - это основная сущность системы, которая позволяет организовать работу команд'
				}
				action={<ProjectCreateButton />}
			/>
			<ProjectsFilter />
			<Projects />
			<ProjectsFetcher />
			<ProjectsPagination />
		</Group>
	)
}
