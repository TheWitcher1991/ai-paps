import { TextInput } from '@gravity-ui/uikit'

import { changeQueryFromInput, useDatasetsStore } from '~widgets/datasets'

import { SearchIcon } from '~infra/ui'

import { useDebounce } from '@wcsc/hooks'

export default function DatasetsSearch() {
	const { loading } = useDatasetsStore()

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
