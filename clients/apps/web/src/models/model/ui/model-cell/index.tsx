import { Flex, Label, Text } from '@gravity-ui/uikit'
import { IconBrain } from '@tabler/icons-react'

import { WithModel } from '@wcsc/models'

import styles from './index.module.scss'

export const ModelCell = ({ model }: WithModel) => {
	return (
		<div className={styles.modelCell}>
			<Flex gap={2.5} alignItems={'center'}>
				<IconBrain size={17} />
				<Flex direction={'column'} gap={0}>
					<Text color='secondary' variant='caption-2'>
						МОДЕЛЬ
					</Text>
					<Text variant='subheader-1' color='primary'>{model.name}</Text>
				</Flex>
			</Flex>
			<Label size='xs' theme='clear'>
				{model.architecture}
			</Label>
		</div>
	)
}
