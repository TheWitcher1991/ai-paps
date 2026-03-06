import { IconCard } from '../icon-card'
import { Flex, Text } from '@gravity-ui/uikit'
import { ReactNode } from 'react'

interface CardIconTitleProps {
	icon: ReactNode
	title: ReactNode
	caption: ReactNode
}

export const CardIconTitle = ({ icon, title, caption }: CardIconTitleProps) => {
	return (
		<Flex alignItems={'center'} gap={3}>
			<IconCard>{icon}</IconCard>
			<Flex direction={'column'} gap={0}>
				<Text variant='subheader-2'>{title}</Text>
				<Text color='secondary' variant='body-1'>
					{caption}
				</Text>
			</Flex>
		</Flex>
	)
}
