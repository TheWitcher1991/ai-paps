import { ModelTable, TableSkeleton } from '~features/shared'
import { useTaskTableData } from '~features/task'

import { taskTableColumns } from '~models/task'

import { DataLoader } from '~infra/lib'
import { Placeholder } from '~infra/ui'

import { useTasksStore } from './tasks.hooks'

export default function Tasks() {
	const { list, loading, error, count, checked } = useTasksStore()

	const data = useTaskTableData(list)

	return (
		<DataLoader
			hasError={error}
			isLoading={loading}
			countData={count}
			loadingFallback={<TableSkeleton />}
		>
			<ModelTable
				data={data}
				columns={taskTableColumns}
				emptyMessage={<Placeholder />}
				selectedIds={checked}
			/>
		</DataLoader>
	)
}
