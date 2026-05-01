import { useStore } from 'effector-react'
import { $store, setList, setCount, setFilter, setLoading, setError } from './projects.store'

export function useProjectsStore() {
  return useStore($store)
}

export { $store, setList, setCount, setFilter, setLoading, setError }
