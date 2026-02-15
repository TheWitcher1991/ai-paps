import { DatasetActions } from '../dataset-actions'
import { useMemo } from 'react'

import { Indicator, TableLink } from '~infra/ui'

import { href } from '@wcsc/href'
import { DatasetSourceMapper, IDataset } from '@wcsc/models'

export const useDatasetTableData = (datasets: IDataset[]) =>
	useMemo(
		() =>
			datasets.map(dataset => ({
				name: (
					<TableLink href={href.datasets.view(dataset.id)}>
						{dataset.name}
					</TableLink>
				),
				format: dataset.format,
				classes: <Indicator count={dataset.classes.length} />,
				source: DatasetSourceMapper[dataset.source],
				actions: <DatasetActions dataset={dataset} />,
			})),
		[datasets],
	)
