import { Button, Card, Flex, Label, Text } from '@gravity-ui/uikit'

import styles from './index.module.scss'

export const AiCard = () => {
	return (
		<Card className={styles.aicard}>
			<Flex alignItems={'center'} gap={5}>
				<Label size='m' theme='info'>
					PyTorch
				</Label>
				<Text variant='subheader-2'>Faster RCNN</Text>
				<Label size='m' theme='warning'>
					Detection
				</Label>
				<Text color='secondary'>
					AI that can identify plant diseases from photographs.
				</Text>
			</Flex>
			<Button view='action'>обучение</Button>
		</Card>
	)
}
