import { TaskDatasetButton, TaskViewButton } from '~models/task'

import { Actions } from '~infra/ui'

import { WithTask } from '@wcsc/models'

export const TaskActions = ({ task }: WithTask) => {
	return (
		<Actions>
			<TaskViewButton task={task} onlyIcon={true} />
			<TaskDatasetButton task={task} onlyIcon={true} />
		</Actions>
	)
}
