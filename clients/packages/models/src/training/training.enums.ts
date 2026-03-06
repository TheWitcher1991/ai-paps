import { EnumType } from '@wcsc/types'

export const TrainingStatus = {
	PENDING: 'pending',
	QUEUED: 'queued',
	RUNNING: 'running',
	VALIDATING: 'validating',
	FINISHED: 'finished',
	FAILED: 'FAfailedILED',
	CANCELLED: 'cancelled',
} as const

export type TrainingStatus = EnumType<typeof TrainingStatus>

export const TrainingOptimizer = {
	ADAM: 'adam',
	ADAMW: 'adamw',
	SGD: 'sgd',
	RMSPROP: 'rmsprop',
} as const

export type TrainingOptimizer = EnumType<typeof TrainingOptimizer>

export const TrainingLossFunction = {
	BCE: 'BCE',
	BCE_WITH_LOGITS: 'BCEWithLogits',
	CROSS_ENTROPY: 'CrossEntropy',
	MSE: 'MSE',
} as const

export type TrainingLossFunction = EnumType<typeof TrainingLossFunction>

export const TrainingScheduler = {
	STEP: 'StepLR',
	EXPONENTIAL: 'ExponentialLR',
	PLATEAU: 'ReduceLROnPlateau',
	COSINE: 'CosineAnnealingLR',
	COSINE_WARMUP: 'CosineAnnealingWarmRestarts',
} as const

export type TrainingScheduler = EnumType<typeof TrainingScheduler>
