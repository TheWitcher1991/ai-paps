'use client'

import { use } from 'react'

import Model from '~widgets/model'
import { setBreadcrumbs } from '~widgets/nav'

import { useModel } from '~models/model'

import { DataLoader } from '~infra/lib'
import { Group } from '~infra/ui'

import { useMount } from '@wcsc/hooks'
import { IModel, toModelID } from '@wcsc/models'
import { generateBreadcrumbs } from '@wcsc/toolkit'

export default function ModelPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = use(params)

	const { isLoading, isError, data } = useModel(toModelID(id))

	useMount(() => setBreadcrumbs(generateBreadcrumbs('models', 'view')))

	return (
		<Group>
			<DataLoader isLoading={isLoading} hasError={isError}>
				<Model model={data?.data as IModel} />
			</DataLoader>
		</Group>
	)
}
