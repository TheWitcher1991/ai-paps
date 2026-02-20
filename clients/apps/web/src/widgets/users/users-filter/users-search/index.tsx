import { TextInput } from '@gravity-ui/uikit'

import { changeQueryFromInput, useUsersStore } from '~widgets/users'

import { SearchIcon } from '~infra/ui'

import { useDebounce } from '@wcsc/hooks'

export default function UsersSearch() {
	const { loading } = useUsersStore()

	const setSearch = useDebounce(e => changeQueryFromInput(e))

	return (
		<TextInput
			disabled={loading}
			size={'m'}
			placeholder='Поиск...'
			startContent={<SearchIcon />}
			onChange={setSearch}
		/>
	)
}
