import { setFilter, useTasksStore } from '~widgets/tasks'

import { ListView } from '~infra/ui'

import { useMemoizedFn } from '@wcsc/hooks'

export default function TasksView() {
	const { loading, filter } = useTasksStore()

	const onUpdate = useMemoizedFn(value => {
		setFilter({
			view: value,
		})
	})

	return <ListView loading={loading} view={filter.view} onUpdate={onUpdate} />
}
