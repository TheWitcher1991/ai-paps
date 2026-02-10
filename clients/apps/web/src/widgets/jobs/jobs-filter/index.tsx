import { Flex } from '@gravity-ui/uikit'

import JobsSearch from './jobs-search'
import JobsView from './jobs-view'

export function JobsFilter() {
	return (
		<Flex alignItems={'center'} gap={3}>
			<JobsSearch />
			<JobsView />
		</Flex>
	)
}
