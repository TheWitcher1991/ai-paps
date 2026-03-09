import { ChevronLeft, ChevronRight } from '@gravity-ui/icons'
import { Button, Card, Icon, Text } from '@gravity-ui/uikit'

import { WithAsset } from '@wcsc/models'

import styles from './index.module.scss'

export const AssetPlayer = ({ asset }: WithAsset) => {
	return (
		<Card className={styles.assetPlayer} view='filled'>
			<Button>
				<Icon data={ChevronLeft} />
				Предыдущее
			</Button>
			<Text color='secondary'>UID {asset.id}</Text>
			<Button>
				Следующее
				<Icon data={ChevronRight} />
			</Button>
		</Card>
	)
}
