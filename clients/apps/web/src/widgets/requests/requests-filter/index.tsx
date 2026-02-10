import { Flex } from '@gravity-ui/uikit'

import RequestsSearch from './requests-search'
import RequestsView from './requests-view'

export function RequestsFilter() {
	return (
		<Flex alignItems={'center'} gap={3}>
			<RequestsSearch />
			<RequestsView />
		</Flex>
	)
}
