import { InferOutput } from 'valibot'

import { Branded, InjectProps, PaginateQuery } from '@wcsc/types'

import {
	TrainingLossFunction,
	TrainingOptimizer,
	TrainingScheduler,
	TrainingStatus,
} from './training.enums'
import {
	TrainingModel,
	TrainingRunModel,
	WriteableTrainingModel,
	WriteableTrainingRunModel,
} from './training.model'

export type TrainingID = Branded<number, 'TrainingID'>

export type ITraining = InferOutput<typeof TrainingModel>

export type ICreateTraining = InferOutput<typeof WriteableTrainingModel>

export type IUpdateTraining = Partial<
	InferOutput<typeof WriteableTrainingModel>
>

export type WithTraining = InjectProps<'training', ITraining>

export type WithTrainingID = InjectProps<'training', TrainingID>

export type UseTrainings = PaginateQuery & {
	subset: TrainingStatus
	optimizer: TrainingOptimizer
	loss_function: TrainingLossFunction
	lr_scheduler: TrainingScheduler
}

export type TrainingRunID = Branded<number, 'TrainingRunID'>

export type ITrainingRun = InferOutput<typeof TrainingRunModel>

export type ICreateTrainingRun = InferOutput<typeof WriteableTrainingRunModel>

export type IUpdateTrainingRun = Partial<
	InferOutput<typeof WriteableTrainingRunModel>
>

export type WithTrainingRun = InjectProps<'run', ITrainingRun>

export type WithTrainingRunID = InjectProps<'run', TrainingRunID>

export type UseTrainingRuns = PaginateQuery & {
	status: TrainingStatus
}
