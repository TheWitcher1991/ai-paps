'use client'

import { setBreadcrumbs } from '~widgets/nav'

import { Group, PageTitle } from '~packages/ui'

import { useMount } from '@wcsc/hooks'
import { href } from '@wcsc/href'

export default function Models() {
	useMount(() =>
		setBreadcrumbs([{ text: 'Нейронные сети', href: href.models.index }]),
	)

	return (
		<Group>
			<PageTitle
				title={'Нейронные сети'}
				subtitle={
					'Панель мониторинга и управления ключевыми метриками системы'
				}
			/>
		</Group>
	)
}
