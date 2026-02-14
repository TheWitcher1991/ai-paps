import { EnumType } from '@wcsc/types'

export const DatasetSource = {
	PROJECTS: 'projects',
	TASKS: 'tasks',
	JOBS: 'jobs',
	USERS: 'users',
} as const

export type DatasetSource = EnumType<typeof DatasetSource>

export const DatasetStatus = {
	UPLOADED: 'uploaded',
	ANNOTATION: 'annotation',
	COMPLETED: 'completed',
} as const

export type DatasetStatus = EnumType<typeof DatasetStatus>

export const DatasetSubset = {
	TRAIN: 'train',
	TEST: 'test',
	VALIDATION: 'validation',
} as const

export type DatasetSubset = EnumType<typeof DatasetSubset>

export const DatasetFormat = {
	COCO: 'COCO 1.0',
	YOLO: 'YOLO 1.0',
} as const

export type DatasetFormat = EnumType<typeof DatasetFormat>
