import { useStore } from 'effector-react'
import { $store, setList, setCount, setFilter, setLoading, setError } from './models.store'

export function useModelsStore() {
  return useStore($store)
}

export { $store, setList, setCount, setFilter, setLoading, setError }
