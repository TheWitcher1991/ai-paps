import { createEffect } from 'effector'

/**
 * Effector effect для выполнения запросов
 */
export const queryFx = createEffect(async <T>(fn: () => Promise<T>): Promise<T> => {
  return fn()
})
