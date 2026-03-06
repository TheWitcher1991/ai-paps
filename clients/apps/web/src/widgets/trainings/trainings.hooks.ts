import { useUnit } from 'effector-react'

import { $store } from './trainings.store'

export const useTrainingsStore = () => useUnit($store)
