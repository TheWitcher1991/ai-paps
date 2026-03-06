import {
	TrainingLossFunction,
	TrainingOptimizer,
	TrainingScheduler,
	TrainingStatus,
} from './training.enums'

export const TrainingStatusMapper: Record<TrainingStatus, string> = {
	[TrainingStatus.PENDING]: 'Ожидает',
	[TrainingStatus.QUEUED]: 'В очереди',
	[TrainingStatus.RUNNING]: 'Обучение',
	[TrainingStatus.VALIDATING]: 'Валидация',
	[TrainingStatus.FINISHED]: 'Завершено',
	[TrainingStatus.FAILED]: 'Ошибка',
	[TrainingStatus.CANCELLED]: 'Отменено',
}

export const TrainingOptimizerMapper: Record<TrainingOptimizer, string> = {
	[TrainingOptimizer.ADAM]: 'Adam',
	[TrainingOptimizer.ADAMW]: 'AdamW',
	[TrainingOptimizer.SGD]: 'SGD',
	[TrainingOptimizer.RMSPROP]: 'RMSprop',
}

export const TrainingLossFunctionMapper: Record<TrainingLossFunction, string> =
	{
		[TrainingLossFunction.CROSS_ENTROPY]: 'Cross Entropy',
		[TrainingLossFunction.BCE]: 'BCE',
		[TrainingLossFunction.DICE]: 'DICE Loss',
		[TrainingLossFunction.BCE_WITH_LOGITS]: 'BCEWithLogits',
		[TrainingLossFunction.BINARY_CROSS_ENTROPY]: 'Binary Cross-Entropy',
		[TrainingLossFunction.MSE]: 'MSE',
	}

export const TrainingSchedulerMapper: Record<TrainingScheduler, string> = {
	[TrainingScheduler.STEP]: 'StepLR',
	[TrainingScheduler.EXPONENTIAL]: 'ExponentialLR',
	[TrainingScheduler.PLATEAU]: 'ReduceLROnPlateau',
	[TrainingScheduler.COSINE]: 'CosineAnnealingLR',
	[TrainingScheduler.COSINE_WARMUP]: 'CosineAnnealingWarmRestarts',
}

export const TrainingStatusColorMapper: Record<TrainingStatus, string> = {
	[TrainingStatus.PENDING]: 'var(--g-color-base-neutral-medium)',
	[TrainingStatus.QUEUED]: 'var(--g-color-base-neutral-medium)',
	[TrainingStatus.RUNNING]: 'var(--g-color-text-warning)',
	[TrainingStatus.VALIDATING]: 'var(--g-color-text-warning)',
	[TrainingStatus.FINISHED]: 'var(--g-color-base-brand)',
	[TrainingStatus.FAILED]: 'var(--g-color-text-danger)',
	[TrainingStatus.CANCELLED]: 'var(--g-color-base-neutral-medium)',
}
