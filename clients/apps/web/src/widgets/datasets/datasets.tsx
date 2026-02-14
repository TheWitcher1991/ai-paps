import { useDatasetTableData } from '~features/dataset'
import { ModelTable, TableSkeleton } from '~features/shared'

import { datasetTableColumns } from '~models/dataset'

import { DataLoader } from '~infra/lib'
import { Placeholder } from '~infra/ui'

import { useDatasetsStore } from './datasets.hooks'

export default function Datasets() {
	const { list, loading, error, count, checked } = useDatasetsStore()

	const data = useDatasetTableData(list)

	return (
		<DataLoader
			hasError={error}
			isLoading={loading}
			countData={count}
			loadingFallback={<TableSkeleton />}
		>
			<ModelTable
				data={data}
				columns={datasetTableColumns}
				emptyMessage={<Placeholder />}
				selectedIds={checked}
			/>
		</DataLoader>
	)
}
