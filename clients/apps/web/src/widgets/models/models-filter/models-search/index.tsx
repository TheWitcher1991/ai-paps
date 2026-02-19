import { TextInput } from '@gravity-ui/uikit'

import { changeQueryFromInput, useModelsStore } from '~widgets/models'

import { SearchIcon } from '~infra/ui'

import { useDebounce } from '@wcsc/hooks'

export default function ModelsSearch() {
	const { loading } = useModelsStore()

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
