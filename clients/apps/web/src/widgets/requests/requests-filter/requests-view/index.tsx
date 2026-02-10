import { setFilter, useRequestsStore } from '~widgets/requests'

import { ListView } from '~infra/ui'

import { useMemoizedFn } from '@wcsc/hooks'

export default function RequestsView() {
	const { loading, filter } = useRequestsStore()

	const onUpdate = useMemoizedFn(value => {
		setFilter({
			view: value,
		})
	})

	return <ListView loading={loading} view={filter.view} onUpdate={onUpdate} />
}
