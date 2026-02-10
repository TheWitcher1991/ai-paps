import { http } from '~infra/http'

import { createReadonlyTaskApi } from '@wcsc/models'

const { useTask, useInfinitTasks, useTasks } = createReadonlyTaskApi(http)

export { useTask, useInfinitTasks, useTasks }
