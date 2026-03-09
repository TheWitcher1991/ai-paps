'use client'

import { use } from 'react'

import { setBreadcrumbs } from '~widgets/nav'
import Training from '~widgets/training'

import { useTraining } from '~models/training'

import { DataLoader } from '~infra/lib'
import { Group } from '~infra/ui'

import { useMount } from '@wcsc/hooks'
import { ITraining, toTrainingID } from '@wcsc/models'
import { generateBreadcrumbs } from '@wcsc/toolkit'

export default function TrainingPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = use(params)

	const { isLoading, isError, data } = useTraining(toTrainingID(id))

	useMount(() => setBreadcrumbs(generateBreadcrumbs('models', 'view')))

	return (
		<Group>
			<DataLoader isLoading={isLoading} hasError={isError}>
				<Training model={data?.data as ITraining} />
			</DataLoader>
		</Group>
	)
}
