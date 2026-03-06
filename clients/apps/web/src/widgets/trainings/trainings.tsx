import { TableSkeleton } from '~features/shared'
import { TrainingList } from '~features/training'

import { DataLoader } from '~infra/lib'
import { Grid } from '~infra/ui'

import { useTrainingsStore } from './trainings.hooks'

export default function Trainings() {
	const { list, loading, error, count } = useTrainingsStore()

	return (
		<DataLoader
			hasError={error}
			isLoading={loading}
			countData={count}
			loadingFallback={<TableSkeleton />}
		>
			<Grid gap={16} gridTemplateColumns={'1fr 1fr 1fr'}>
				<TrainingList trainings={list} />
			</Grid>
		</DataLoader>
	)
}
