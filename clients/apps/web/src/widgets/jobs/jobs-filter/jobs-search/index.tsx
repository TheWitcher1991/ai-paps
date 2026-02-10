import { TextInput } from '@gravity-ui/uikit'

import { changeQueryFromInput, useJobsStore } from '~widgets/jobs'

import { SearchIcon } from '~infra/ui'

import { useDebounce } from '@wcsc/hooks'

export default function JobsSearch() {
	const { loading } = useJobsStore()

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
