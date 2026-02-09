import { Flex } from '@gravity-ui/uikit'

import ProjectsSearch from './projects-search'

export function ProjectsFilter() {
	return (
		<Flex alignItems={'center'} gap={3}>
			<ProjectsSearch />
		</Flex>
	)
}
