import { TaskID } from './task.types'

export const toTaskID = (id: number | string): TaskID => Number(id) as TaskID
