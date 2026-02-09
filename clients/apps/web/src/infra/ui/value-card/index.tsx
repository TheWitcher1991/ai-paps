import { Card, Flex, Icon, IconData, Text } from '@gravity-ui/uikit'

import styles from './index.module.scss'

interface ValueCardProps {
	value?: string | number
	title: string
	icon?: IconData
}

export const ValueCard = ({ value, title, icon }: ValueCardProps) => {
	return (
		<Card className={styles.valueCard} view={'filled'}>
			<Flex direction={'column'}>
				<Text variant={'display-1'}>{value}</Text>
				<Text variant={'body-2'} color={'secondary'}>
					{title}
				</Text>
			</Flex>
			<Icon data={icon} size={26} color={'brand'} />
		</Card>
	)
}
