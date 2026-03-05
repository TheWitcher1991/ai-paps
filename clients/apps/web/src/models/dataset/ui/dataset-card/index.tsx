import {
	Archive,
	CurlyBracketsFunction,
	DatabaseMagnifier,
	NutHex,
	Picture,
	Tag,
} from '@gravity-ui/icons'
import { IconDatabase } from '@tabler/icons-react'

import { ModelCard, ModelStatus } from '~infra/ui'

import { DatasetSourceMapper, WithDataset } from '@wcsc/models'
import { formatDateInRu } from '@wcsc/toolkit'

export const DatasetCard = ({ dataset }: WithDataset) => (
	<ModelCard
		icon={<IconDatabase />}
		title={dataset.name}
		caption={formatDateInRu(dataset.created_date)}
		status={<ModelStatus />}
		grid={[
			{
				icon: Picture,
				title: 'ИЗОБРАЖЕНИЙ',
				caption: dataset.classes.length,
			},
			{
				icon: Tag,
				title: 'АННОТАЦИЙ',
				caption: dataset.classes.length,
			},
			{
				icon: CurlyBracketsFunction,
				title: 'КЛАССОВ',
				caption: dataset.classes.length,
			},
			{
				icon: DatabaseMagnifier,
				title: 'ФОРМАТ',
				caption: dataset.format,
			},
			{
				icon: Archive,
				title: 'РАЗМЕР',
				caption: '3.4 ГБ',
			},
			{
				icon: NutHex,
				title: 'ИСТОЧНИК',
				caption: DatasetSourceMapper[dataset.source],
			},
		]}
	>
		Обучающий набор изображений томатов для семантической сегментации
	</ModelCard>
)
