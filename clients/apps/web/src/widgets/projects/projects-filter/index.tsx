import { Flex } from '@gravity-ui/uikit'

import ProjectsSearch from './projects-search'
import ProjectsView from './projects-view'

export function ProjectsFilter() {
	return (
		<Flex alignItems={'center'} gap={3}>
			<ProjectsSearch />
			<ProjectsView />
		</Flex>
	)
}
