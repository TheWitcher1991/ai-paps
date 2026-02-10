import {
	createApi,
	createReadonlyApi,
	CrudRepository,
	HttpClientInstance,
	ReadonlyRepository,
} from '@wcsc/toolkit'
import { Paginated } from '@wcsc/types'

import { taskConfig } from './task.config'
import { ICreateTask, ITask, IUpdateTask, TaskID, UseTasks } from './task.types'

export const createReadonlyTaskRepository = (http: HttpClientInstance) =>
	new ReadonlyRepository<Paginated<ITask>, ITask, UseTasks, TaskID>(
		http,
		taskConfig.models,
	)

export const createTaskRepository = (http: HttpClientInstance) =>
	new CrudRepository<
		Paginated<ITask>,
		ITask,
		ICreateTask,
		IUpdateTask,
		UseTasks,
		TaskID
	>(http, taskConfig.models)

export const createReadonlyTaskApi = (http: HttpClientInstance) => {
	const api = createReadonlyApi<Paginated<ITask>, ITask, UseTasks, TaskID>(
		http,
		{
			list: taskConfig.models,
			detail: taskConfig.model,
			infinity: taskConfig.infiniteModels,
		},
	)

	return {
		useTasks: api.useEntities,
		useTask: api.useEntity,
		useInfinitTasks: api.useInfinityEntities,
		taskRepository: api.repo,
	}
}

export const createTaskApi = (http: HttpClientInstance) => {
	const api = createApi<
		Paginated<ITask>,
		ITask,
		ICreateTask,
		IUpdateTask,
		UseTasks,
		TaskID
	>(http, {
		list: taskConfig.models,
		detail: taskConfig.model,
		infinity: taskConfig.infiniteModels,
	})

	return {
		useTasks: api.useEntities,
		useTask: api.useEntity,
		useInfinityTasks: api.useInfinityEntities,
		useCreateTask: api.useCreateEntity,
		useUpdateTask: api.useUpdateEntity,
		useDeleteTask: api.useDeleteEntity,
		taskRepository: api.repo,
	}
}
