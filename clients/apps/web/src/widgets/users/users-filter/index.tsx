import { Flex } from '@gravity-ui/uikit'

import UsersSearch from './users-search'
import UsersView from './users-view'

export function UsersFilter() {
	return (
		<Flex alignItems={'center'} gap={3}>
			<UsersSearch />
			<UsersView />
		</Flex>
	)
}
