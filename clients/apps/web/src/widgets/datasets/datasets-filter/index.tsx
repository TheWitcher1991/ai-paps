import { Flex } from '@gravity-ui/uikit'

import DatasetsSearch from './datasets-search'

export function DatasetsFilter() {
	return (
		<Flex alignItems={'center'} gap={3}>
			<DatasetsSearch />
		</Flex>
	)
}
