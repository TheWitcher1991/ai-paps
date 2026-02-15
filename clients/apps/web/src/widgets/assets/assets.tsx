import { useAssetTableData } from '~features/asset'
import { ModelTable, TableSkeleton } from '~features/shared'

import { assetTableColumns } from '~models/asset'

import { DataLoader } from '~infra/lib'
import { Placeholder } from '~infra/ui'

import { useAssetsStore } from './assets.hooks'

export default function Assets() {
	const { list, loading, error, count, checked } = useAssetsStore()

	const data = useAssetTableData(list)

	return (
		<DataLoader
			hasError={error}
			isLoading={loading}
			countData={count}
			loadingFallback={<TableSkeleton />}
		>
			<ModelTable
				data={data}
				columns={assetTableColumns}
				emptyMessage={<Placeholder />}
				selectedIds={checked}
			/>
		</DataLoader>
	)
}
