'use client'

import {
	BarsDescendingAlignLeftArrowDown,
	Circles5Random,
	GripHorizontal,
	LayoutCellsLarge,
	Persons,
	Sliders,
	SquareDashed,
	SquareDashedCircle,
} from '@gravity-ui/icons'
import {
	Button,
	DropdownMenu,
	Flex,
	Icon,
	Pagination,
	SegmentedRadioGroup,
	Text,
	TextInput,
} from '@gravity-ui/uikit'
import React from 'react'

import { setBreadcrumbs } from '~widgets/nav'

import { Grid, Group, PageTitle, SearchIcon, ValueCard } from '~infra/ui'

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
			<Flex
				gap={4}
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				<ValueCard value={0} title={'Сотрудников'} icon={Persons} />
				<ValueCard
					value={0}
					title={'Размечено'}
					icon={SquareDashedCircle}
				/>
				<ValueCard
					value={0}
					title={'Неразмечено'}
					icon={SquareDashed}
				/>
				<ValueCard
					value={0}
					title={'Аннотаций'}
					icon={Circles5Random}
				/>
			</Flex>
			<Flex alignItems={'center'} gap={3}>
				<TextInput
					disabled={false}
					size={'m'}
					placeholder='Поиск...'
					startContent={<SearchIcon />}
				/>
				<DropdownMenu
					renderSwitcher={props => (
						<Button {...props} view={'outlined'} size={'m'}>
							Фильтр
							<Icon data={Sliders} size={16} />
						</Button>
					)}
					size={'m'}
					items={[]}
				/>
				<DropdownMenu
					renderSwitcher={props => (
						<Button {...props} view={'outlined'} size={'m'}>
							Сортировка
							<Icon
								data={BarsDescendingAlignLeftArrowDown}
								size={16}
							/>
						</Button>
					)}
					size={'m'}
					items={[]}
				/>
				<SegmentedRadioGroup name='view' size={'m'}>
					<SegmentedRadioGroup.Option value='table'>
						<Icon data={LayoutCellsLarge} size={16} />
					</SegmentedRadioGroup.Option>
					<SegmentedRadioGroup.Option value='list'>
						<Icon data={GripHorizontal} size={16} />
					</SegmentedRadioGroup.Option>
				</SegmentedRadioGroup>
			</Flex>
			<Grid gap={20} gridTemplateColumns={'repeat(3, 1fr)'}></Grid>
			<Flex justifyContent={'space-between'} alignItems={'center'}>
				<Text color={'secondary'}>Всего 1</Text>
				<Pagination
					page={1}
					pageSize={25}
					total={1}
					compact={true}
					showPages={true}
					onUpdate={(page, pageSize) => {}}
				/>
			</Flex>
		</Group>
	)
}
