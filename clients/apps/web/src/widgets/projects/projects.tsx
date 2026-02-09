import { useProjectsStore } from '~widgets/projects/projects.hooks'

import { useProjectTableData } from '~features/project'
import { ModelTable, TableSkeleton } from '~features/shared'

import { projectTableColumns } from '~models/project'

import { DataLoader } from '~infra/lib'
import { Placeholder } from '~infra/ui'

export default function Projects() {
	const { list, loading, error, count, checked } = useProjectsStore()

	const data = useProjectTableData(list)

	return (
		<DataLoader
			hasError={error}
			isLoading={loading}
			countData={count}
			loadingFallback={<TableSkeleton />}
		>
			<ModelTable
				data={data}
				columns={projectTableColumns}
				emptyMessage={<Placeholder />}
				selectedIds={checked}
			/>
		</DataLoader>
	)
}
