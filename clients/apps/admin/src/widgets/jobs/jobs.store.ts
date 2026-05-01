import { createModelListApi } from '~infra/lib/api'
import { IJob } from '~models/job'

export interface JobFilter { page: number; page_size: number; search?: string }

export const { setCount, setList, setFilter, setLoading, setError, reset, changeQueryFromInput, toggleChecked, clearChecked, $store, fetchFx } = createModelListApi<IJob, JobFilter>({
  name: 'cvat-jobs', defaultFilter: { page_size: 25, page: 1 },
  fetchFn: async () => ({ count: 0, next: null, previous: null, results: [] }), queryKey: ['cvat-jobs'],
})
