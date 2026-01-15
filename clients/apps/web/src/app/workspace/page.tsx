'use client'

import { setBreadcrumbs } from '~widgets/nav'

import { Group, PageTitle } from '~packages/ui'

import { useMount } from '@wcsc/hooks'

export default function Workspace() {
	useMount(() => setBreadcrumbs([{ text: 'Дашборд', href: '/' }]))

	return (
		<Group>
			<PageTitle
				title={'Панель управления'}
				subtitle={
					'Панель мониторинга и управления ключевыми метриками системы'
				}
			/>
		</Group>
	)
}
