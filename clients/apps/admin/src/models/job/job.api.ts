import { http } from '~infra/http'
import { createReadonlyJobApi, IJob } from '@wcsc/models'

const { useJob, useInfinitJobs, useJobs } = createReadonlyJobApi(http)

export { useJob, useInfinitJobs, useJobs }
export type { IJob }
