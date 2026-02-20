import { EnumType } from '@wcsc/types'

export const ModelSubset = {
	CLASSIFICATION: 'classification',
	SEGMENTATION: 'segmentation',
	DETECTION: 'detection',
} as const

export type ModelSubset = EnumType<typeof ModelSubset>

export const ModelFramework = {
	TENSORFLOW: 'tensorflow',
	PYTORCH: 'pytorch',
	ULTRALYTICS: 'ultralytics',
} as const

export type ModelFramework = EnumType<typeof ModelFramework>

export const ModelStatus = {
	READY: 'ready',
	DEPLOYED: 'deployed',
	TRAINING: 'training',
	ARCHIVED: 'archived'
} as const

export type ModelStatus = EnumType<typeof ModelStatus>

export const ModelArchitecture = {
	resnet50: 'resnet50',
	resnet101: 'resnet101',
	resnet152: 'resnet152',
	deeplabv3: 'deeplabv3',
	unet: 'unet',
	yolo: 'yolo',
} as const

export type ModelArchitecture = EnumType<typeof ModelArchitecture>