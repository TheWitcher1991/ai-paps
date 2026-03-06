import { CircleCheck, CircleXmark, Stopwatch } from '@gravity-ui/icons'
import { Icon, Spin } from '@gravity-ui/uikit'
import { ReactNode } from 'react'

import { http } from '~infra/http'

import {
	createTrainingApi,
	createTrainingRunApi,
	TrainingStatus,
} from '@wcsc/models'

export const {
	useTraining,
	useInfinitTrainings,
	useTrainings,
	useCreateTraining,
	useUpdateTraining,
} = createTrainingApi(http)

export const { useStartTrainingRun, useCancelTrainingRun, useTrainingRun } =
	createTrainingRunApi(http)

export const TrainingStatusIconMapper: Record<TrainingStatus, ReactNode> = {
	[TrainingStatus.PENDING]: <Icon data={Stopwatch} size={14} />,
	[TrainingStatus.QUEUED]: <Icon data={Stopwatch} size={14} />,
	[TrainingStatus.RUNNING]: <Spin size='xs' />,
	[TrainingStatus.VALIDATING]: <Spin size='xs' />,
	[TrainingStatus.FINISHED]: <Icon data={CircleCheck} size={14} />,
	[TrainingStatus.FAILED]: <Icon data={CircleXmark} size={14} />,
	[TrainingStatus.CANCELLED]: <Icon data={CircleXmark} size={14} />,
}
