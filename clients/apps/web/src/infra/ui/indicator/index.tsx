import { CurlyBracketsFunction } from '@gravity-ui/icons'
import { Flex, Icon, Text } from '@gravity-ui/uikit'

import styles from './index.module.scss'

type IndicatorResource = 'classes'

interface IndicatorProps {
	resource?: IndicatorResource
	count: number
}

const icon = {
	classes: CurlyBracketsFunction,
}

export const Indicator = ({
	resource = 'classes',
	count = 0,
}: IndicatorProps) => {
	return (
		<Flex gap={1}>
			<Icon
				data={icon[resource]}
				size={16}
				className={styles.indicator}
			/>
			<Text>{count}</Text>
		</Flex>
	)
}
