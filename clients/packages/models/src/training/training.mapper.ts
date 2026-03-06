import { TrainingStatus } from './training.enums'

export const TrainingStatusMapper: Record<TrainingStatus, string> = {
	[TrainingStatus.PENDING]: 'Ожидает',
	[TrainingStatus.QUEUED]: 'В очереди',
	[TrainingStatus.RUNNING]: 'Обучение',
	[TrainingStatus.VALIDATING]: 'Валидация',
	[TrainingStatus.FINISHED]: 'Завершено',
	[TrainingStatus.FAILED]: 'Ошибка',
	[TrainingStatus.CANCELLED]: 'Отменено',
}
