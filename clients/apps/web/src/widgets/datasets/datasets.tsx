import { DatasetList } from '~features/dataset'
import { TableSkeleton } from '~features/shared'

import { DataLoader } from '~infra/lib'
import { Grid } from '~infra/ui'

import { useDatasetsStore } from './datasets.hooks'

export default function Datasets() {
	const { list, loading, error, count } = useDatasetsStore()

	return (
		<DataLoader
			hasError={error}
			isLoading={loading}
			countData={count}
			loadingFallback={<TableSkeleton />}
		>
			<Grid gap={16} gridTemplateColumns={'1fr 1fr 1fr'}>
				<DatasetList datasets={list} />
			</Grid>
		</DataLoader>
	)
}
