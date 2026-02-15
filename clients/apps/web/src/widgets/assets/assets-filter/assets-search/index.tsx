import { TextInput } from '@gravity-ui/uikit'

import { changeQueryFromInput, useAssetsStore } from '~widgets/assets'

import { SearchIcon } from '~infra/ui'

import { useDebounce } from '@wcsc/hooks'

export default function AssetsSearch() {
	const { loading } = useAssetsStore()

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
