'use client'

import { useDeferredValue } from 'react'

import { TrainingCard } from '~models/training'

import { ITraining } from '@wcsc/models'

interface TrainingListProps {
	trainings: ITraining[]
}

export const renderTrainingCard = (training: ITraining) => (
	<TrainingCard key={training.id} training={training} />
)

export function TrainingList({ trainings }: TrainingListProps) {
	const list = useDeferredValue(trainings, [])

	return list.map(renderTrainingCard)
}
