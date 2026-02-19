import { Flex } from '@gravity-ui/uikit'

import ModelsSearch from './models-search'

export function ModelsFilter() {
	return (
		<Flex alignItems={'center'} gap={3}>
			<ModelsSearch />
		</Flex>
	)
}
