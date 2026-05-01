import { createModelListApi } from '~infra/lib/api'
import { ITask } from '~models/task'

export interface TaskFilter {
  page: number
  page_size: number
  search?: string
}

export const {
  setCount, setList, setFilter, setLoading, setError, reset,
  changeQueryFromInput, toggleChecked, clearChecked, $store, fetchFx,
} = createModelListApi<ITask, TaskFilter>({
  name: 'cvat-tasks',
  defaultFilter: { page_size: 25, page: 1 },
  fetchFn: async () => ({ count: 0, next: null, previous: null, results: [] }),
  queryKey: ['cvat-tasks'],
})
