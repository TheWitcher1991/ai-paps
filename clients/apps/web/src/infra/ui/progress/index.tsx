import { Flex, Text } from '@gravity-ui/uikit'

import { TrainingStatus, TrainingStatusColorMapper } from '@wcsc/models'

import styles from './index.module.scss'

interface ProgressProps {
	caption: string
	value: number
	max: number
	status?: TrainingStatus
}

export const Progress = ({ caption, value, max, status }: ProgressProps) => {
	const percentage = Math.min(100, Math.max(0, (value / max) * 100))

	return (
		<Flex direction={'column'} gap={1.5}>
			<Flex alignItems={'center'} justifyContent={'space-between'}>
				<Text variant='caption-2'>
					{caption} {value} / {max}
				</Text>
				<Text variant='caption-2' color='primary'>
					{percentage.toFixed(0)}%
				</Text>
			</Flex>
			<div className={styles.progress}>
				<div
					className={styles.progressActive}
					style={{ background: TrainingStatusColorMapper[status] }}
				/>
			</div>
		</Flex>
	)
}
