import { ModelList } from '~features/model'
import { TableSkeleton } from '~features/shared'

import { DataLoader } from '~infra/lib'

import { useModelsStore } from './models.hooks'

export default function Models() {
	const { list, loading, error, count } = useModelsStore()

	return (
		<DataLoader
			hasError={error}
			isLoading={loading}
			countData={count}
			loadingFallback={<TableSkeleton />}
		>
			<ModelList models={list} />
		</DataLoader>
	)
}
