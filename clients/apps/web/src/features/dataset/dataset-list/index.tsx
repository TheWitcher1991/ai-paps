'use client'

import { useDeferredValue } from 'react'

import { DatasetCard } from '~models/dataset'

import { IDataset } from '@wcsc/models'

interface DatasetListProps {
	datasets: IDataset[]
}

export const renderDatasetCard = (dataset: IDataset) => (
	<DatasetCard key={dataset.id} dataset={dataset} />
)

export function DatasetList({ datasets }: DatasetListProps) {
	const list = useDeferredValue(datasets, [])

	return list.map(renderDatasetCard)
}
