import { TextInput } from '@gravity-ui/uikit'

import { changeQueryFromInput, useTrainingsStore } from '~widgets/trainings'

import { SearchIcon } from '~infra/ui'

import { useDebounce } from '@wcsc/hooks'

export default function TrainingsSearch() {
	const { loading } = useTrainingsStore()

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
