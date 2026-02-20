import { ModelSubset } from './model.enums'

export const ModelSubsetMapper: Record<ModelSubset, string> = {
	[ModelSubset.CLASSIFICATION]: 'Классификация',
	[ModelSubset.SEGMENTATION]: 'Сегментация',
	[ModelSubset.DETECTION]: 'Обнаружение',
}