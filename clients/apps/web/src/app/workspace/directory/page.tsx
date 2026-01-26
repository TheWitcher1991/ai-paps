'use client'

import { Box, BranchesDown, Bug, Cherry, Stethoscope } from '@gravity-ui/icons'
import { Button, Flex, Icon, PlaceholderContainer } from '@gravity-ui/uikit'

import { setBreadcrumbs } from '~widgets/nav'

import { DashkitWidget, Group, PageTitle, ValueCard } from '~packages/ui'

import { useMount } from '@wcsc/hooks'
import { href } from '@wcsc/href'
import { NotFound } from '@gravity-ui/illustrations'
import React from 'react'

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
				action={
					<Button type={'button'} view={'action'} size={'l'}>
						<Icon data={Box} size={16} />
						Новая сущность
					</Button>
				}
			/>
			<Flex
				gap={4}
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				<ValueCard value={0} title={'Классов'} icon={BranchesDown} />
				<ValueCard value={0} title={'Объектов'} icon={Cherry} />
				<ValueCard value={0} title={'Болезней'} icon={Stethoscope} />
				<ValueCard value={0} title={'Вредетилелей'} icon={Bug} />
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
				<DashkitWidget title={'Объекты'}>
					<PlaceholderContainer
						title='Нет объектов'
						size='m'
						align='center'
						image={<Icon data={NotFound} size={120} />}
					/>
				</DashkitWidget>
			</Flex>
			<Flex alignItems={'center'} gap={5}>
				<DashkitWidget title={'Болезни'}>
					<PlaceholderContainer
						title='Нет болезней'
						size='m'
						align='center'
						image={<Icon data={NotFound} size={120} />}
					/>
				</DashkitWidget>
				<DashkitWidget title={'Вредители'}>
					<PlaceholderContainer
						title='Нет вредителей'
						size='m'
						align='center'
						image={<Icon data={NotFound} size={120} />}
					/>
				</DashkitWidget>
			</Flex>
		</Group>
	)
}
