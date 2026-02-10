import { InferOutput } from 'valibot'

import { Branded, InjectProps, PaginateQuery } from '@wcsc/types'

import { TaskModel, WriteableTaskModel } from './task.model'

export type TaskID = Branded<number, 'TaskID'>

export type ITask = InferOutput<typeof TaskModel>

export type ICreateTask = InferOutput<typeof WriteableTaskModel>

export type IUpdateTask = Partial<InferOutput<typeof WriteableTaskModel>>

export type WithTask = InjectProps<'task', ITask>

export type WithTaskID = InjectProps<'task', TaskID>

export type UseTasks = PaginateQuery & {
	view?: string
}
