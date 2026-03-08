import { ModelModel, vModelId } from '../model'
import { array, number, object } from 'valibot'

import { BaseModel, merge, vBrand, vShape } from '@wcsc/toolkit'

import {
	TrainingLossFunction,
	TrainingOptimizer,
	TrainingScheduler,
	TrainingStatus,
} from './training.enums'
import { vDatasetId } from '../dataset'

export const vTrainingId = vBrand(vShape.id, 'TrainingID')

export const vTrainingConfigId = vBrand(vShape.id, 'TrainingConfigID')

export const vTrainingRunId = vBrand(vShape.id, 'TrainingRunID')

export const vTrainingDatasetId = vBrand(vShape.id, 'TrainingDatasetID')

export const BaseTrainingRunModel = object({
	status: vShape.enum(TrainingStatus),
	current_epoch: number(),
	train_loss: number(),
	val_loss: number(),
	test_loss: number(),
	started_date: vShape.optional(vShape.datetime),
	finished_date: vShape.optional(vShape.datetime),
})

export const TrainingRunModel = merge(
	BaseModel,
	BaseTrainingRunModel,
	object({
		id: vTrainingRunId,
	}),
)

export const WriteableTrainingRunModel = merge(BaseTrainingRunModel)

export const BaseTrainingConfigModel = object({
	lr_scheduler: vShape.enum(TrainingScheduler),
	optimizer: vShape.enum(TrainingOptimizer),
	loss_function: vShape.enum(TrainingLossFunction),
	epochs: number(),
	early_stopping_patience: number(),
	train_batch_size: number(),
	valid_batch_size: number(),
	learning_rate: number(),
	image_width: number(),
	image_height: number(),
})

export const TrainingConfigModel = merge(
	BaseModel,
	BaseTrainingConfigModel,
	object({
		id: vTrainingConfigId,
	}),
)

export const WriteableTrainingConfigModel = merge(BaseTrainingConfigModel)

export const TrainingDatasetModel = merge(
	BaseModel,
	BaseTrainingRunModel,
	object({
		id: vTrainingDatasetId,
	}),
)

export const BaseTrainingModel = object({
	name: vShape.title,
	description: vShape.optional(vShape.description),
})

export const TrainingModel = merge(
	BaseModel,
	BaseTrainingModel,
	object({
		id: vTrainingId,
		model: ModelModel,
		config: TrainingConfigModel,
		runs: array(TrainingRunModel),
		datasets: array(TrainingDatasetModel),
	}),
)

export const WriteableTrainingModel = merge(
	BaseTrainingModel,
	object({
		model: vModelId,
		dataset_ids: array(vDatasetId),
		config: WriteableTrainingConfigModel,
	}),
)
