import { setFilter, useJobsStore } from '~widgets/jobs'

import { ListView } from '~infra/ui'

import { useMemoizedFn } from '@wcsc/hooks'

export default function JobsView() {
	const { loading, filter } = useJobsStore()

	const onUpdate = useMemoizedFn(value => {
		setFilter({
			view: value,
		})
	})

	return <ListView loading={loading} view={filter.view} onUpdate={onUpdate} />
}
