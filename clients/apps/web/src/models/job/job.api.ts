import { http } from '~infra/http'

import { createJobActionApi, createReadonlyJobApi } from '@wcsc/models'

const { useJob, useInfinitJobs, useJobs } = createReadonlyJobApi(http)

const { useJobExport, useJobRequest } = createJobActionApi(http)

export { useJob, useInfinitJobs, useJobs, useJobExport, useJobRequest }
