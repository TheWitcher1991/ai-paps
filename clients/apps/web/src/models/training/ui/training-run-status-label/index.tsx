import { TrainingStatusIconMapper } from '~models/training/training.api'

import {
	TrainingStatus,
	TrainingStatusColorMapper,
	TrainingStatusMapper,
} from '@wcsc/models'

import styles from './index.module.scss'

export const TrainingRunStatusLabel = ({
	status,
}: {
	status: TrainingStatus
}) => (
	<div
		className={styles.modelCardStatus}
		style={{
			borderColor: TrainingStatusColorMapper[status],
			color: TrainingStatusColorMapper[status],
		}}
	>
		{TrainingStatusIconMapper[status]}
		{TrainingStatusMapper[status]}
	</div>
)
