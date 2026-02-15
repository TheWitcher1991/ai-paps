import { setFilter, useAssetsStore } from '~widgets/assets'

import { ListView } from '~infra/ui'

import { useMemoizedFn } from '@wcsc/hooks'

export default function AssetsView() {
	const { loading, filter } = useAssetsStore()

	const onUpdate = useMemoizedFn(value => {
		setFilter({
			view: value,
		})
	})

	return <ListView loading={loading} view={filter.view} onUpdate={onUpdate} />
}
