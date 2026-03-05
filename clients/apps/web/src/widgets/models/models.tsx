import { ModelList } from '~features/model'
import { TableSkeleton } from '~features/shared'

import { DataLoader } from '~infra/lib'
import { Grid } from '~infra/ui'

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
			<Grid gap={16} gridTemplateColumns={'1fr 1fr 1fr'}>
				<ModelList models={list} />
			</Grid>
		</DataLoader>
	)
}
