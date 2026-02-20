import { useUnit } from 'effector-react'

import { $store } from './users.store'

export const useUsersStore = () => useUnit($store)
