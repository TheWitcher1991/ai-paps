import {
	ModelBackbone,
	ModelFramework,
	ModelStatus,
	ModelSubset,
} from './model.enums'

export const ModelSubsetMapper: Record<ModelSubset, string> = {
	[ModelSubset.CLASSIFICATION]: 'Классификация',
	[ModelSubset.SEGMENTATION]: 'Сегментация',
	[ModelSubset.DETECTION]: 'Детекция',
}

export const ModelStatusMapper: Record<ModelStatus, string> = {
	[ModelStatus.READY]: 'Готова',
	[ModelStatus.DEPLOYED]: 'Развернута',
	[ModelStatus.TRAINING]: 'Обучается',
	[ModelStatus.ARCHIVED]: 'Архив',
}

export const ModelFrameworkMapper: Record<ModelFramework, string> = {
	[ModelFramework.PYTORCH]: 'Pytorch',
	[ModelFramework.ULTRALYTICS]: 'Ultralytics',
	[ModelFramework.TENSORFLOW]: 'TensorFlow',
}

export const ModelBackboneMapper: Record<ModelBackbone, string> = {
	[ModelBackbone.resnet50]: 'ResNet50',
	[ModelBackbone.resnet101]: 'ResNet101',
	[ModelBackbone.resnet152]: 'ResNet152',
}
