'use client'

import { use } from 'react'
import { useMount } from '@wcsc/hooks'
import { setBreadcrumbs } from '~widgets/nav'
import { PageTitle, Group } from '~infra/ui'
import { TrainingDetail } from '~widgets/training'
import { useTraining } from '~models/training'
import { Spinner } from '~components/ui/spinner'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function TrainingDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const { data, isLoading, error } = useTraining(Number(id) as any)

  useMount(() =>
    setBreadcrumbs([
      { text: 'Дашборд', href: '/workspace' },
      { text: 'Обучение моделей', href: '/workspace/trainings' },
      { text: `Обучение #${id}`, href: '#' },
    ]),
  )

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>
  if (error || !data?.data) return <p className="text-destructive">Ошибка загрузки обучения</p>

  return (
    <Group>
      <PageTitle title={`Обучение #${id}`} subtitle="Детали обучения" />
      <TrainingDetail training={data.data} />
    </Group>
  )
}
