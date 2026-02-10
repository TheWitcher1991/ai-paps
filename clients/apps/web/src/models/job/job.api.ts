import { http } from '~infra/http'

import { createReadonlyJobApi } from '@wcsc/models'

const { useJob, useInfinitJobs, useJobs } = createReadonlyJobApi(http)

export { useJob, useInfinitJobs, useJobs }
