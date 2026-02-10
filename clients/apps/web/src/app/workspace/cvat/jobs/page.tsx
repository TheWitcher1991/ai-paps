'use client'

import Jobs, { JobsFetcher, JobsFilter, JobsPagination } from '~widgets/jobs'
import { setBreadcrumbs } from '~widgets/nav'

import { CvatSegmented } from '~features/cvat'

import { Group, PageTitle } from '~infra/ui'

import { useMount } from '@wcsc/hooks'
import { href } from '@wcsc/href'

export default function JobsPage() {
	useMount(() =>
		setBreadcrumbs([{ text: 'Джобы', href: href.cvat.jobs.index }]),
	)

	return (
		<Group>
			<CvatSegmented />
			<PageTitle
				title={'Джобы'}
				subtitle={
					'Джобы - это основная сущность системы, которая позволяет организовать работу команд'
				}
			/>
			<JobsFilter />
			<Jobs />
			<JobsFetcher />
			<JobsPagination />
		</Group>
	)
}
