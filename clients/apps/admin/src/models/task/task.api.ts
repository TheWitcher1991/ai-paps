import { http } from '~infra/http'
import { createReadonlyTaskApi, ITask } from '@wcsc/models'

const { useTask, useInfinitTasks, useTasks } = createReadonlyTaskApi(http)

export { useTask, useInfinitTasks, useTasks }
export type { ITask }
