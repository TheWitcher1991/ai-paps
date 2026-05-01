import { createModelListApi } from '~infra/lib/api'
import { IModel } from '~models/model'

export interface ModelFilter {
  page: number
  page_size: number
  view: 'table' | 'grid'
  task?: string
  framework?: string
  backbone?: string
  search?: string
}

export const {
  setCount,
  setList,
  setFilter,
  setLoading,
  setError,
  reset,
  changeQueryFromInput,
  toggleChecked,
  clearChecked,
  $store,
  fetchFx,
} = createModelListApi<IModel, ModelFilter>({
  name: 'models',
  defaultFilter: {
    page_size: 25,
    page: 1,
    view: 'grid',
  },
  fetchFn: async () => ({ count: 0, next: null, previous: null, results: [] }),
  queryKey: ['models'],
})
