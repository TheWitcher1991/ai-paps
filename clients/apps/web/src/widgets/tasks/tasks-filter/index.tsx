import { Flex } from '@gravity-ui/uikit'

import TasksSearch from './tasks-search'
import TasksView from './tasks-view'

export function TasksFilter() {
	return (
		<Flex alignItems={'center'} gap={3}>
			<TasksSearch />
			<TasksView />
		</Flex>
	)
}
