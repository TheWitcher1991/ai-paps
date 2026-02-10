import { setFilter, useProjectsStore } from '~widgets/projects'

import { ListView } from '~infra/ui'

import { useMemoizedFn } from '@wcsc/hooks'

export default function ProjectsView() {
	const { loading, filter } = useProjectsStore()

	const onUpdate = useMemoizedFn(value => {
		setFilter({
			view: value,
		})
	})

	return <ListView loading={loading} view={filter.view} onUpdate={onUpdate} />
}
