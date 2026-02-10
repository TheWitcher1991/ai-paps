import { useUnit } from 'effector-react'

import { $store } from './tasks.store'

export const useTasksStore = () => useUnit($store)
