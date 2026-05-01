'use client'

import { use } from 'react'
import { useMount } from '@wcsc/hooks'
import { setBreadcrumbs } from '~widgets/nav'
import { PageTitle, Group } from '~infra/ui'
import { ModelDetail } from '~widgets/model'
import { useModel } from '~models/model'
import { Spinner } from '~components/ui/spinner'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ModelDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const { data, isLoading, error } = useModel(Number(id) as any)

  useMount(() =>
    setBreadcrumbs([
      { text: 'Дашборд', href: '/workspace' },
      { text: 'Нейронные сети', href: '/workspace/models' },
      { text: `Модель #${id}`, href: '#' },
    ]),
  )

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>
  if (error || !data?.data) return <p className="text-destructive">Ошибка загрузки модели</p>

  return (
    <Group>
      <PageTitle title={`Модель #${id}`} subtitle="Детали модели" />
      <ModelDetail model={data.data} />
    </Group>
  )
}
