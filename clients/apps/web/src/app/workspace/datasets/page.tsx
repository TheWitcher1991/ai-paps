'use client'

import { setBreadcrumbs } from '~widgets/nav'

import { Group, PageTitle } from '~packages/ui'

import { useMount } from '@wcsc/hooks'
import { href } from '@wcsc/href'

export default function Datasets() {
	useMount(() =>
		setBreadcrumbs([{ text: 'Датасеты', href: href.datasets.index }]),
	)

	return (
		<Group>
			<PageTitle
				title={'Датасеты'}
				subtitle={
					'Панель мониторинга и управления ключевыми метриками системы'
				}
			/>
		</Group>
	)
}
