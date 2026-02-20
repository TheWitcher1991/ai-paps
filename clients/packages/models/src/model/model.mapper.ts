import { ModelStatus, ModelSubset } from './model.enums'

export const ModelSubsetMapper: Record<ModelSubset, string> = {
	[ModelSubset.CLASSIFICATION]: 'Классификация',
	[ModelSubset.SEGMENTATION]: 'Сегментация',
	[ModelSubset.DETECTION]: 'Обнаружение',
}

export const ModelStatusMapper: Record<ModelStatus, string> = {
	[ModelStatus.READY]: 'Готова',
	[ModelStatus.DEPLOYED]: 'Развернута',
	[ModelStatus.TRAINING]: 'Обучается',
	[ModelStatus.ARCHIVED]: 'Архив',
}
