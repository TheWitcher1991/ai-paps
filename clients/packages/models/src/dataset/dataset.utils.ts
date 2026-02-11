import { DatasetID } from './dataset.types'

export const toDatasetID = (id: number | string): DatasetID =>
	Number(id) as DatasetID
