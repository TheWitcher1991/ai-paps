import { TaskActions } from '../task-actions'
import { useMemo } from 'react'

import { formatDateInRu } from '@wcsc/toolkit'
import { ITask } from '@wcsc/models'

export const useTaskTableData = (tasks: ITask[]) =>
	useMemo(
		() => tasks.map(task => ({ 
			name: task.name,
			owner: task.owner.username,
			status: task.status,
			jobs: task.jobs.count,
			created_date: formatDateInRu(task.created_date),
			actions: <TaskActions task={task} /> 
		})),
		[tasks],
	)
