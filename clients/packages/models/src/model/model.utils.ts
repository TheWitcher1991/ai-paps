import { DatasetID } from './model.types'

export const toDatasetID = (id: number | string): DatasetID =>
	Number(id) as DatasetID
