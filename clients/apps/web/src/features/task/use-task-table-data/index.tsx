import { TaskActions } from '../task-actions'
import { useMemo } from 'react'

import { formatDateInRu } from '@wcsc/toolkit'
import { ITask } from '@wcsc/models'
import { Indicator } from '~infra/ui'

export const useTaskTableData = (tasks: ITask[]) =>
	useMemo(
		() => tasks.map(task => ({ 
			name: task.name,
			owner: task.owner.username,
			status: task.status,
			jobs: <Indicator count={task.jobs.count} resource='jobs' />,
			created_date: formatDateInRu(task.created_date),
			actions: <TaskActions task={task} /> 
		})),
		[tasks],
	)
