'use client'

import { setBreadcrumbs } from '~widgets/nav'
import Requests, {
	RequestsFetcher,
	RequestsFilter,
	RequestsPagination,
} from '~widgets/requests'

import { CvatSegmented } from '~features/cvat'

import { Group, PageTitle } from '~infra/ui'

import { useMount } from '@wcsc/hooks'
import { href } from '@wcsc/href'

export default function RequestsPage() {
	useMount(() =>
		setBreadcrumbs([{ text: 'Запросы', href: href.cvat.requests.index }]),
	)

	return (
		<Group>
			<CvatSegmented />
			<PageTitle
				title={'Запросы'}
				subtitle={
					'Запросы - это основная сущность системы, которая позволяет организовать работу команд'
				}
			/>
			<RequestsFilter />
			<Requests />
			<RequestsFetcher />
			<RequestsPagination />
		</Group>
	)
}
