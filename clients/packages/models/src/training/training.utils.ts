import { TrainingID } from './training.types'

export const toTrainingID = (id: number | string): TrainingID =>
	Number(id) as TrainingID
