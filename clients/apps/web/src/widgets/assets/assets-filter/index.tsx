import { Flex } from '@gravity-ui/uikit'

import AssetsSearch from './assets-search'
import AssetsView from './assets-view'

export function AssetsFilter() {
	return (
		<Flex alignItems={'center'} gap={3}>
			<AssetsSearch />
			<AssetsView />
		</Flex>
	)
}
