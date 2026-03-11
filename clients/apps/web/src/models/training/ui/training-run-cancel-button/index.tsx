import { CircleXmark } from '@gravity-ui/icons'

import { useCancelTrainingRun } from '~models/training/training.api'

import { query, toaster } from '~infra/lib'
import { Action } from '~infra/ui'

import { WithTraining } from '@wcsc/models'

export const TrainingRunCancelButton = ({
	training,
	onlyIcon,
}: PropsWithAction<WithTraining>) => {
	const run = useCancelTrainingRun(training?.runs[0]?.id)

	const handleCancel = async e => {
		e.stopPropagation()
		await query(async () => {
			await run.mutateAsync()
			toaster.add({
				title: 'Обучение Отменено',
				name: 'training-cancel',
			})
		})
	}

	return (
		<Action
			view={'raised'}
			loading={run.isPending}
			onClick={handleCancel}
			icon={CircleXmark}
			onlyIcon={onlyIcon}
		>
			Отменить
		</Action>
	)
}
