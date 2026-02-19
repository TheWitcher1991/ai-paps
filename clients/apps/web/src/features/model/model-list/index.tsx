'use client'

import { useDeferredValue } from 'react'

import { ModelCard } from '~models/model'

import { IModel } from '@wcsc/models'

interface ModelListProps {
	models: IModel[]
}

export const renderModelCard = (model: IModel) => (
	<ModelCard key={model.id} model={model} />
)

export function ModelList({ models }: ModelListProps) {
	const list = useDeferredValue(models, [])

	return list.map(renderModelCard)
}
