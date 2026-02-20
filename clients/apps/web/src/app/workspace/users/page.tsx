'use client'

import { UsersIndicators } from '~widgets/dashkit/users-indicators'
import { setBreadcrumbs } from '~widgets/nav'
import Users, {
	UsersFetcher,
	UsersFilter,
	UsersPagination,
} from '~widgets/users'

import { Group, PageTitle } from '~infra/ui'

import { useMount } from '@wcsc/hooks'
import { generateBreadcrumbs } from '@wcsc/toolkit'

export default function UsersPage() {
	useMount(() => setBreadcrumbs(generateBreadcrumbs('users')))

	return (
		<Group>
			<PageTitle
				title={'Сотрудники'}
				subtitle={
					'Панель мониторинга и управления ключевыми метриками системы'
				}
			/>
			<UsersIndicators />
			<UsersFilter />
			<Users />
			<UsersFetcher />
			<UsersPagination />
		</Group>
	)
}
