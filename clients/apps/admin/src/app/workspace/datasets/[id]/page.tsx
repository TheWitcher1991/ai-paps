'use client'

import { use } from 'react'
import { useMount } from '@wcsc/hooks'
import { setBreadcrumbs } from '~widgets/nav'
import { PageTitle, Group } from '~infra/ui'
import { AssetsWidget } from '~widgets/assets'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function DatasetDetailPage({ params }: PageProps) {
  const { id } = use(params)

  useMount(() =>
    setBreadcrumbs([
      { text: 'Дашборд', href: '/workspace' },
      { text: 'Датасеты', href: '/workspace/datasets' },
      { text: `Датасет #${id}`, href: '#' },
    ]),
  )

  return (
    <Group>
      <PageTitle title={`Датасет #${id}`} subtitle="Ассеты датасета" />
      <AssetsWidget datasetId={Number(id)} />
    </Group>
  )
}
