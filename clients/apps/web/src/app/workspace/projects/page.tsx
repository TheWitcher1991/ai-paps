'use client'

import { setBreadcrumbs } from '~widgets/nav'

import { Group, PageTitle } from '~packages/ui'

import { useMount } from '@wcsc/hooks'
import { href } from '@wcsc/href'

export default function Projects() {
	useMount(() =>
		setBreadcrumbs([{ text: 'Проекты', href: href.projects.index }]),
	)

	return (
		<Group>
			<PageTitle
				title={'Проекты'}
				subtitle={
					'Панель мониторинга и управления ключевыми метриками системы'
				}
			/>
		</Group>
	)
}
