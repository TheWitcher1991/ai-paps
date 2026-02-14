import { DatasetSource, DatasetStatus, DatasetSubset } from './dataset.enums'

export const DatasetSourceMapper: Record<DatasetSource, string> = {
	[DatasetSource.PROJECTS]: 'Проекты',
	[DatasetSource.TASKS]: 'Задачи',
	[DatasetSource.JOBS]: 'Джобы',
	[DatasetSource.USERS]: 'Пользователи',
}

export const DatasetStatusMapper: Record<DatasetStatus, string> = {
	[DatasetStatus.UPLOADED]: 'Загружен',
	[DatasetStatus.ANNOTATION]: 'Размечается',
	[DatasetStatus.COMPLETED]: 'Завершен',
}

export const DatasetSubsetMapper: Record<DatasetSubset, string> = {
	[DatasetSubset.TRAIN]: 'Обучение',
	[DatasetSubset.TEST]: 'Tестирование',
	[DatasetSubset.VALIDATION]: 'Валидация',
}
