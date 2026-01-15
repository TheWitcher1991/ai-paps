'use client'

import { setBreadcrumbs } from '~widgets/nav'

import { Group, PageTitle } from '~packages/ui'

import { useMount } from '@wcsc/hooks'
import { href } from '@wcsc/href'

export default function Users() {
	useMount(() =>
		setBreadcrumbs([{ text: 'Сотрудники', href: href.users.index }]),
	)

	return (
		<Group>
			<PageTitle
				title={'Сотрудники'}
				subtitle={
					'Панель мониторинга и управления ключевыми метриками системы'
				}
			/>
		</Group>
	)
}
