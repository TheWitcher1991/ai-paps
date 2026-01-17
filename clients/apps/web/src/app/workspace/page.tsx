'use client'

import {
	BranchesDown,
	Molecule,
	Picture,
	SquareDashedCircle,
} from '@gravity-ui/icons'
import { NotFound } from '@gravity-ui/illustrations'
import { Flex, Icon, PlaceholderContainer } from '@gravity-ui/uikit'

import { setBreadcrumbs } from '~widgets/nav'

import { DashkitWidget, Group, PageTitle, ValueCard } from '~packages/ui'

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
			<Flex
				gap={4}
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				<ValueCard value={0} title={'Классов'} icon={BranchesDown} />
				<ValueCard value={0} title={'Моделей'} icon={Molecule} />
				<ValueCard
					value={0}
					title={'Датасетов'}
					icon={SquareDashedCircle}
				/>
				<ValueCard value={0} title={'Изображений'} icon={Picture} />
			</Flex>
			<Flex alignItems={'center'} gap={5}>
				<DashkitWidget title={'Классы'}>
					<PlaceholderContainer
						title='Нет классов'
						size='m'
						align='center'
						image={<Icon data={NotFound} size={120} />}
					/>
				</DashkitWidget>
				<DashkitWidget title={'Прогресс разметки'}>
					<PlaceholderContainer
						title='Нет датасетов'
						size='m'
						align='center'
						image={<Icon data={NotFound} size={120} />}
					/>
				</DashkitWidget>
			</Flex>
		</Group>
	)
}
