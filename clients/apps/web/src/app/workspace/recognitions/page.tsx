'use client'

import { setBreadcrumbs } from '~widgets/nav'

import { Group, PageTitle } from '~infra/ui'

import { useMount } from '@wcsc/hooks'
import { href } from '@wcsc/href'

export default function Recognitions() {
	useMount(() =>
		setBreadcrumbs([
			{ text: 'Распознавание', href: href.recognitions.index },
		]),
	)

	return (
		<Group>
			<PageTitle
				title={'Распознавание'}
				subtitle={
					'Панель мониторинга и управления ключевыми метриками системы'
				}
			/>
		</Group>
	)
}
