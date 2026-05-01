import { createModelListApi } from '~infra/lib/api'
import { IProject } from '~models/project'

export interface ProjectFilter {
  page: number
  page_size: number
  search?: string
}

export const {
  setCount, setList, setFilter, setLoading, setError, reset,
  changeQueryFromInput, toggleChecked, clearChecked, $store, fetchFx,
} = createModelListApi<IProject, ProjectFilter>({
  name: 'cvat-projects',
  defaultFilter: { page_size: 25, page: 1 },
  fetchFn: async () => ({ count: 0, next: null, previous: null, results: [] }),
  queryKey: ['cvat-projects'],
})
