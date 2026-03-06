import {
	CurlyBracketsFunction,
	DatabaseMagnifier,
	HardDrive,
	Layers,
	Picture,
	Tag,
} from '@gravity-ui/icons'
import { IconDatabase } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

import { ModelCard, ModelStatus } from '~infra/ui'

import { href } from '@wcsc/href'
import { DatasetSubsetMapper, WithDataset } from '@wcsc/models'
import { formatDateInRu, formatFileSize } from '@wcsc/toolkit'

export const DatasetCard = ({ dataset }: WithDataset) => {
	const router = useRouter()

	return (
		<ModelCard
			onClick={() => router.push(href.datasets.view(dataset.id))}
			icon={<IconDatabase />}
			title={dataset.name}
			caption={formatDateInRu(dataset.created_date)}
			status={<ModelStatus />}
			grid={[
				{
					icon: Picture,
					title: 'ИЗОБРАЖЕНИЙ',
					caption: dataset.count_assets,
				},
				{
					icon: Tag,
					title: 'АННОТАЦИЙ',
					caption: dataset.count_annotations,
				},
				{
					icon: CurlyBracketsFunction,
					title: 'КЛАССОВ',
					caption: dataset.count_classes,
				},
				{
					icon: DatabaseMagnifier,
					title: 'ФОРМАТ',
					caption: dataset.format,
				},
				{
					icon: HardDrive,
					title: 'РАЗМЕР',
					caption: formatFileSize(dataset.size),
				},
				{
					icon: Layers,
					title: 'ТИП ЗАДАЧИ',
					caption: DatasetSubsetMapper[dataset.subset],
				},
			]}
		>
			{dataset.description}
		</ModelCard>
	)
}
