import { Card, Flex, Icon, IconData, Text } from '@gravity-ui/uikit'
import { PropsWithChildren, ReactNode } from 'react'

import { Grid, IconCard } from '~infra/ui'

import styles from './index.module.scss'

type ModelCardGrid = {
	icon: IconData
	title: string
	caption: string
}

interface ModelCardProps extends PropsWithChildren {
	title: string
	caption: ReactNode
	icon: ReactNode
	status: ReactNode
	grid: ModelCardGrid[]
	onClick?: () => void
}

export const ModelCard = ({
	title,
	caption,
	status,
	grid,
	children,
	icon,
	onClick,
}: ModelCardProps) => (
	<Card
		className={styles.modelCard}
		view='filled'
		type='action'
		onClick={onClick}
	>
		<Flex justifyContent={'space-between'}>
			<Flex alignItems={'center'} gap={3}>
				<IconCard>{icon}</IconCard>
				<Flex direction={'column'} gap={0}>
					<Text variant='subheader-2'>{title}</Text>
					<Text color='secondary' variant='body-1'>
						{caption}
					</Text>
				</Flex>
			</Flex>
			{status}
		</Flex>
		<Text color='secondary' variant='body-1'>
			{children}
		</Text>
		<Grid gap={10} gridTemplateColumns={'1fr 1fr'}>
			{grid.map((grid, i) => (
				<Flex
					key={i}
					alignItems={'center'}
					gap={3}
					className={styles.modelCardGrid}
				>
					<Icon data={grid.icon} size={18} color='secondary' />
					<Flex direction={'column'} gap={0}>
						<Text color='secondary' variant='caption-2'>
							{grid.title}
						</Text>
						<Text variant='subheader-1'>{grid.caption}</Text>
					</Flex>
				</Flex>
			))}
		</Grid>
	</Card>
)
