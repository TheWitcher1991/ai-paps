import { useUnit } from 'effector-react'

import { $store } from './jobs.store'

export const useJobsStore = () => useUnit($store)
