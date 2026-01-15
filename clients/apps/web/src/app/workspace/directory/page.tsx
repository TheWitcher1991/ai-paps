'use client'

import { setBreadcrumbs } from '~widgets/nav'

import { Group, PageTitle } from '~packages/ui'

import { useMount } from '@wcsc/hooks'
import { href } from '@wcsc/href'

export default function Directory() {
	useMount(() =>
		setBreadcrumbs([{ text: 'Справочник', href: href.directory.index }]),
	)

	return (
		<Group>
			<PageTitle
				title={'Справочник'}
				subtitle={
					'Панель мониторинга и управления ключевыми метриками системы'
				}
			/>
		</Group>
	)
}
