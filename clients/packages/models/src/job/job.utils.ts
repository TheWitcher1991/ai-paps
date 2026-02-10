import { JobID } from './job.types'

export const toJobID = (id: number | string): JobID => Number(id) as JobID
