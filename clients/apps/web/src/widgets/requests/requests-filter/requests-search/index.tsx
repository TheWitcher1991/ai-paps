import { TextInput } from '@gravity-ui/uikit'

import { changeQueryFromInput, useRequestsStore } from '~widgets/requests'

import { SearchIcon } from '~infra/ui'

import { useDebounce } from '@wcsc/hooks'

export default function RequestsSearch() {
	const { loading } = useRequestsStore()

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
