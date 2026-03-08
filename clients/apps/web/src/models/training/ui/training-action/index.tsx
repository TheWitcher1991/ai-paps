import { TrainingRunCancelButton } from '../training-run-cancel-button'
import { TrainingRunStartButton } from '../training-run-start-button'

import { TrainingStatus, WithTraining } from '@wcsc/models'

export const TrainingAction = ({ training }: WithTraining) => {
	switch (training?.runs[0]?.status) {
		case TrainingStatus.RUNNING: {
			return <TrainingRunCancelButton training={training} />
		}
		default: {
			return <TrainingRunStartButton training={training} />
		}
	}
}
