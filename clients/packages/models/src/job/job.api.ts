import {
	createActionApi,
	createApi,
	createReadonlyApi,
	CrudRepository,
	HttpClientInstance,
	ReadonlyRepository,
} from '@wcsc/toolkit'
import { Paginated } from '@wcsc/types'

import { jobConfig } from './job.config'
import { ICreateJob, IJob, IUpdateJob, JobID, UseJobs } from './job.types'

export const createReadonlyJobRepository = (http: HttpClientInstance) =>
	new ReadonlyRepository<Paginated<IJob>, IJob, UseJobs, JobID>(
		http,
		jobConfig.models,
	)

export const createJobRepository = (http: HttpClientInstance) =>
	new CrudRepository<
		Paginated<IJob>,
		IJob,
		ICreateJob,
		IUpdateJob,
		UseJobs,
		JobID
	>(http, jobConfig.models)

export const createReadonlyJobApi = (http: HttpClientInstance) => {
	const api = createReadonlyApi<Paginated<IJob>, IJob, UseJobs, JobID>(http, {
		list: jobConfig.models,
		detail: jobConfig.model,
		infinity: jobConfig.infiniteModels,
	})

	return {
		useJobs: api.useEntities,
		useJob: api.useEntity,
		useInfinitJobs: api.useInfinityEntities,
		jobRepository: api.repo,
	}
}

export const createJobApi = (http: HttpClientInstance) => {
	const api = createApi<
		Paginated<IJob>,
		IJob,
		ICreateJob,
		IUpdateJob,
		UseJobs,
		JobID
	>(http, {
		list: jobConfig.models,
		detail: jobConfig.model,
		infinity: jobConfig.infiniteModels,
	})

	return {
		useJobs: api.useEntities,
		useJob: api.useEntity,
		useInfinityJobs: api.useInfinityEntities,
		useCreateJob: api.useCreateEntity,
		useUpdateJob: api.useUpdateEntity,
		useDeleteJob: api.useDeleteEntity,
		jobRepository: api.repo,
	}
}

export const createJobActionApi = (http: HttpClientInstance) => {
	const api = createActionApi<JobID>(http, {
		list: jobConfig.models,
		detail: jobConfig.model,
		infinity: jobConfig.infiniteModels,
	})

	return {
		useJobExport: api.useExport,
		useJobRequest: api.useRequest,
		jobActionRepository: api.repo,
	}
}
