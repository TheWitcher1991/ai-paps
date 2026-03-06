import { createSelectOptions } from '@wcsc/toolkit'

import {
	TrainingLossFunction,
	TrainingOptimizer,
	TrainingScheduler,
} from './training.enums'
import {
	TrainingLossFunctionMapper,
	TrainingOptimizerMapper,
	TrainingSchedulerMapper,
} from './training.mapper'
import { TrainingID, TrainingRunID } from './training.types'

export const toTrainingID = (id: number | string): TrainingID =>
	Number(id) as TrainingID

export const toTrainingRunID = (id: number | string): TrainingRunID =>
	Number(id) as TrainingRunID

export const trainingOptimizerOptions = createSelectOptions(
	TrainingOptimizer,
	TrainingOptimizerMapper,
)

export const trainingLossFunctionOptions = createSelectOptions(
	TrainingLossFunction,
	TrainingLossFunctionMapper,
)

export const trainingSchedulerOptions = createSelectOptions(
	TrainingScheduler,
	TrainingSchedulerMapper,
)
