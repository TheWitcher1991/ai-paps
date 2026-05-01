import { createModelListApi } from '~infra/lib/api'
import { ITraining } from '~models/training'

export interface TrainingFilter {
  page: number
  page_size: number
  view: 'table' | 'grid'
  status?: string
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
} = createModelListApi<ITraining, TrainingFilter>({
  name: 'trainings',
  defaultFilter: {
    page_size: 25,
    page: 1,
    view: 'grid',
  },
  fetchFn: async () => ({ count: 0, next: null, previous: null, results: [] }),
  queryKey: ['trainings'],
})
