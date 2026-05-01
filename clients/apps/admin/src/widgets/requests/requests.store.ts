import { createModelListApi } from '~infra/lib/api'
import { IRequest } from '~models/request'

export interface RequestFilter { page: number; page_size: number; search?: string }

export const { setCount, setList, setFilter, setLoading, setError, reset, changeQueryFromInput, toggleChecked, clearChecked, $store, fetchFx } = createModelListApi<IRequest, RequestFilter>({
  name: 'cvat-requests', defaultFilter: { page_size: 25, page: 1 },
  fetchFn: async () => ({ count: 0, next: null, previous: null, results: [] }), queryKey: ['cvat-requests'],
})
