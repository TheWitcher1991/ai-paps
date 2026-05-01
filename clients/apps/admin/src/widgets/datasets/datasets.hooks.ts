import { useStore } from 'effector-react'
import { $store, setList, setCount, setFilter, setLoading, setError, reset, changeQueryFromInput, toggleChecked, clearChecked } from './datasets.store'

export function useDatasetsStore() {
  return useStore($store)
}

export { $store, setList, setCount, setFilter, setLoading, setError, reset, changeQueryFromInput, toggleChecked, clearChecked }
