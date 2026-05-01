import { useStore } from 'effector-react'
import { $store, setList, setCount, setFilter, setLoading, setError } from './requests.store'

export function useRequestsStore() { return useStore($store) }
export { $store, setList, setCount, setFilter, setLoading, setError }
