import { useJobTableData } from '~features/job'
import { ModelTable, TableSkeleton } from '~features/shared'

import { jobTableColumns } from '~models/job'

import { DataLoader } from '~infra/lib'
import { Placeholder } from '~infra/ui'

import { useJobsStore } from './jobs.hooks'

export default function Jobs() {
	const { list, loading, error, count, checked } = useJobsStore()

	const data = useJobTableData(list)

	return (
		<DataLoader
			hasError={error}
			isLoading={loading}
			countData={count}
			loadingFallback={<TableSkeleton />}
		>
			<ModelTable
				data={data}
				columns={jobTableColumns}
				emptyMessage={<Placeholder />}
				selectedIds={checked}
			/>
		</DataLoader>
	)
}
