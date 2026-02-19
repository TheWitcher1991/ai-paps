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