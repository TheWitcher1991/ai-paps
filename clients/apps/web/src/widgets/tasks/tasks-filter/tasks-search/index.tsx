import { TextInput } from '@gravity-ui/uikit'

import { changeQueryFromInput, useTasksStore } from '~widgets/tasks'

import { SearchIcon } from '~infra/ui'

import { useDebounce } from '@wcsc/hooks'

export default function TasksSearch() {
	const { loading } = useTasksStore()

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
