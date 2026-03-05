import { CircleCheck } from '@gravity-ui/icons'
import { Icon, Label } from '@gravity-ui/uikit'

import styles from './index.module.scss'

export const ModelStatus = () => (
	<Label theme='success' size='m' className={styles.modelCardStatus}>
		<Icon data={CircleCheck} />
		Готов
	</Label>
)
