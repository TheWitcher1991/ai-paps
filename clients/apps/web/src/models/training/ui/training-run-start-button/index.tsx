import { CirclePlay } from '@gravity-ui/icons'

import { useStartTrainingRun } from '~models/training/training.api'

import { query, toaster } from '~infra/lib'
import { Action } from '~infra/ui'

import { WithTraining } from '@wcsc/models'

export const TrainingRunStartButton = ({
	training,
	onlyIcon,
}: PropsWithAction<WithTraining>) => {
	const run = useStartTrainingRun(training.id)

	const handleStart = async e => {
		e.stopPropagation()
		await query(async () => {
			await run.mutateAsync()
			toaster.add({
				title: 'Обучение запущено',
				name: 'training-run',
			})
		})
	}

	return (
		<Action
			view={'action'}
			loading={run.isPending}
			onClick={handleStart}
			icon={CirclePlay}
			onlyIcon={onlyIcon}
		>
			Запуск
		</Action>
	)
}
