import { TrainingAction } from '../training-action'
import { TrainingRunStatusLabel } from '../training-run-status-label'
import { ChartLineArrowUp, CirclePlay, Stopwatch } from '@gravity-ui/icons'
import { IconSchool } from '@tabler/icons-react'

import { ModelCard, Progress, Spacing } from '~infra/ui'

import { WithTraining } from '@wcsc/models'
import { formatDateInRu, formatDuration } from '@wcsc/toolkit'
import { ModelCell } from '~models/model'

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
				caption: training?.runs[0]?.train_loss?.toFixed(3) || 0,
			},
			{
				icon: ChartLineArrowUp,
				title: 'VAL LOSS',
				caption: training?.runs[0]?.val_loss?.toFixed(3) || 0,
			},
			{
				icon: Stopwatch,
				title: 'ДЛИТЕЛЬНОСТЬ',
				caption: formatDuration(
					training?.runs[0]?.started_date,
					training?.runs[0]?.finished_date,
				),
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
				content: `Датасета ${training.datasets.length}`,
			},
		]}
		actions={<TrainingAction training={training} />}
	>
		{training.description}
		<Spacing v='xs' />
		<ModelCell model={training?.model} />
		<Spacing v='xs' />
		<Progress
			status={training?.runs[0]?.status}
			caption='Эпоха'
			value={training?.runs[0]?.current_epoch || 0}
			max={training.config.epochs}
		/>
	</ModelCard>
)
