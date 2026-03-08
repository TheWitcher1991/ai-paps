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

import { ModelCard, ModelStatus, Progress } from '~infra/ui'

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
					icon: HardDrive,
					title: 'РАЗМЕР',
					caption: formatFileSize(dataset.size),
				},
				{
					icon: DatabaseMagnifier,
					title: 'ФОРМАТ',
					caption: dataset.format,
				},
			]}
			tags={[
				{
					content: DatasetSubsetMapper[dataset.subset],
				},
				{
					content: dataset.format,
				},
				{
					content: `Классов ${dataset.count_classes}`,
				},
			]}
			footer={<Progress
				disableStack={true}
				caption='Аннотировано'
				value={dataset.annotated_percent}
				max={100}
			/>}
		>
			{dataset.description}
		</ModelCard>
	)
}
