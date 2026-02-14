import { DatasetActions } from '../dataset-actions'
import { useMemo } from 'react'

import { Indicator } from '~infra/ui'

import { DatasetSourceMapper, IDataset } from '@wcsc/models'

export const useDatasetTableData = (datasets: IDataset[]) =>
	useMemo(
		() =>
			datasets.map(dataset => ({
				name: dataset.name,
				format: dataset.format,
				classes: <Indicator count={dataset.classes.length} />,
				source: DatasetSourceMapper[dataset.source],
				actions: <DatasetActions dataset={dataset} />,
			})),
		[datasets],
	)
