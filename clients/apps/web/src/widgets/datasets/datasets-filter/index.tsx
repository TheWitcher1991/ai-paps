import { Flex } from '@gravity-ui/uikit'

import DatasetsSearch from './datasets-search'
import DatasetsView from './datasets-view'

export function DatasetsFilter() {
	return (
		<Flex alignItems={'center'} gap={3}>
			<DatasetsSearch />
			<DatasetsView />
		</Flex>
	)
}
