'use client'

import { setBreadcrumbs } from '~widgets/nav'
import TrainingCreate from '~widgets/training-create'

import { useMount } from '@wcsc/hooks'
import { generateBreadcrumbs } from '@wcsc/toolkit'

export default function TrainingsCreatePage() {
	useMount(() => setBreadcrumbs(generateBreadcrumbs('trainings', 'create')))

	return <TrainingCreate />
}
