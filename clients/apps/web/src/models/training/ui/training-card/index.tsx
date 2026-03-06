import { TrainingRunStartButton } from '../training-run-start-button'
import { TrainingRunStatusLabel } from '../training-run-status-label'
import { ChartLineArrowUp, CirclePlay, Stopwatch } from '@gravity-ui/icons'
import { IconSchool } from '@tabler/icons-react'

import { ModelCard, Progress, Spacing } from '~infra/ui'

import { WithTraining } from '@wcsc/models'
import { formatDateInRu } from '@wcsc/toolkit'

export const TrainingCard = ({ training }: WithTraining) => (
	<ModelCard
		icon={<IconSchool />}
		title={training.name}
		status={<TrainingRunStatusLabel status={training?.runs[0]?.status} />}
		caption={formatDateInRu(training.created_date)}
		grid={[
			{
				icon: ChartLineArrowUp,
				title: 'TRAIN LOSS',
				caption: training?.runs[0]?.train_loss || 0,
			},
			{
				icon: ChartLineArrowUp,
				title: 'VAL LOSS',
				caption: training?.runs[0]?.val_loss || 0,
			},
			{
				icon: Stopwatch,
				title: 'ДЛИТЕЛЬНОСТЬ',
				caption: '0м',
			},
			{
				icon: CirclePlay,
				title: 'ЗАПУСКОВ',
				caption: training.runs.length,
			},
		]}
		tags={[
			{
				content: training.config.optimizer,
			},
			{
				content: `lr: ${training.config.learning_rate}`,
			},
			{
				content: training.config.loss_function,
			},
			{
				content: `${training.datasets.length} датасета`,
			},
		]}
		actions={<TrainingRunStartButton training={training} />}
	>
		{training.description}
		<Spacing v='xs' />
		<Progress
			status={training?.runs[0]?.status}
			caption='Эпоха'
			value={training?.runs[0]?.current_epoch || 0}
			max={training.config.epochs}
		/>
	</ModelCard>
)
