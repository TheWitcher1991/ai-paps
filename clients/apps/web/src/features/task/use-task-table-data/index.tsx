import { TaskActions } from '../task-actions'
import { useMemo } from 'react'

import { ITask } from '@wcsc/models'

export const useTaskTableData = (tasks: ITask[]) =>
	useMemo(
		() => tasks.map(task => ({ actions: <TaskActions task={task} /> })),
		[tasks],
	)
