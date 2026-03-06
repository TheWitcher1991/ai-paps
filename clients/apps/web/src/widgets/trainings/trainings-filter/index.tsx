import { Flex } from '@gravity-ui/uikit'

import TrainingsSearch from './trainings-search'

export function TrainingsFilter() {
	return (
		<Flex alignItems={'center'} gap={3}>
			<TrainingsSearch />
		</Flex>
	)
}
