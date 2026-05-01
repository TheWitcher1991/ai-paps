import { useStore } from 'effector-react'
import { $store, setList, setCount, setFilter, setLoading, setError } from './jobs.store'

export function useJobsStore() { return useStore($store) }
export { $store, setList, setCount, setFilter, setLoading, setError }
