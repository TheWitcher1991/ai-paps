import { ModelTable, TableSkeleton } from '~features/shared'
import { useUserTableData } from '~features/user'

import { userTableColumns } from '~models/user'

import { DataLoader } from '~infra/lib'
import { Placeholder } from '~infra/ui'

import { useUsersStore } from './users.hooks'

export default function Users() {
	const { list, loading, error, count, checked } = useUsersStore()

	const data = useUserTableData(list)

	return (
		<DataLoader
			hasError={error}
			isLoading={loading}
			countData={count}
			loadingFallback={<TableSkeleton />}
		>
			<ModelTable
				data={data}
				columns={userTableColumns}
				emptyMessage={<Placeholder />}
				selectedIds={checked}
			/>
		</DataLoader>
	)
}
