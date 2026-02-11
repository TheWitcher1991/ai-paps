import { http } from '~infra/http'

import { createReadonlyTaskApi, createTaskActionApi } from '@wcsc/models'

const { useTask, useInfinitTasks, useTasks } = createReadonlyTaskApi(http)

const { useTaskExport, useTaskRequest } = createTaskActionApi(http)

export { useTask, useInfinitTasks, useTasks, useTaskExport, useTaskRequest }
