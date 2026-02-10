import { useRequestTableData } from '~features/request'
import { ModelTable, TableSkeleton } from '~features/shared'

import { requestTableColumns } from '~models/request'

import { DataLoader } from '~infra/lib'
import { Placeholder } from '~infra/ui'

import { useRequestsStore } from './requests.hooks'

export default function Jobs() {
	const { list, loading, error, count, checked } = useRequestsStore()

	const data = useRequestTableData(list)

	return (
		<DataLoader
			hasError={error}
			isLoading={loading}
			countData={count}
			loadingFallback={<TableSkeleton />}
		>
			<ModelTable
				data={data}
				columns={requestTableColumns}
				emptyMessage={<Placeholder />}
				selectedIds={checked}
			/>
		</DataLoader>
	)
}
