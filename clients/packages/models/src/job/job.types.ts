import { InferOutput } from 'valibot'

import { Branded, InjectProps, PaginateQuery } from '@wcsc/types'

import { JobModel, WriteableJobModel } from './job.model'

export type JobID = Branded<number, 'JobID'>

export type IJob = InferOutput<typeof JobModel>

export type ICreateJob = InferOutput<typeof WriteableJobModel>

export type IUpdateJob = Partial<InferOutput<typeof WriteableJobModel>>

export type WithJob = InjectProps<'job', IJob>

export type WithJobID = InjectProps<'job', JobID>

export type UseJobs = PaginateQuery & {
	view?: string
}
