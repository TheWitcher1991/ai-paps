'use client'

import {
	BarsDescendingAlignLeftArrowDown,
	Briefcase,
	Clock,
	Flask,
	GearBranches,
	GripHorizontal,
	LayoutCellsLarge,
	Molecule,
	Sliders,
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

import { setBreadcrumbs } from '~widgets/nav'

import { Grid, Group, PageTitle, SearchIcon, ValueCard } from '~infra/ui'

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
					'Работа с обучением и инференсом моделей машинного обучения'
				}
				action={
					<Button type={'button'} view={'action'} size={'l'}>
						<Icon data={GearBranches} size={16} />
						Новое обучение
					</Button>
				}
			/>
			<Flex
				gap={4}
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				<ValueCard value={1} title={'Моделей'} icon={Molecule} />
				<ValueCard value={0} title={'Экспериментов'} icon={Flask} />
				<ValueCard value={0} title={'Затрачено'} icon={Clock} />
				<ValueCard value={0} title={'Инференсов'} icon={Briefcase} />
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
