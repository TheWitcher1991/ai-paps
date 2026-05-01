'use client'

import { use } from 'react'
import { useMount } from '@wcsc/hooks'
import { setBreadcrumbs } from '~widgets/nav'
import { PageTitle, Group } from '~infra/ui'
import { AssetDetail } from '~widgets/asset'
import { useAsset } from '~models/asset'
import { Spinner } from '~components/ui/spinner'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function AssetDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const { data, isLoading, error } = useAsset(Number(id) as any)

  useMount(() =>
    setBreadcrumbs([
      { text: 'Дашборд', href: '/workspace' },
      { text: 'Датасеты', href: '/workspace/datasets' },
      { text: `Ассет #${id}`, href: '#' },
    ]),
  )

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>
  if (error || !data?.data) return <p className="text-destructive">Ошибка загрузки ассета</p>

  return (
    <Group>
      <PageTitle title={`Ассет #${id}`} subtitle="Детали ассета" />
      <AssetDetail asset={data.data as any} />
    </Group>
  )
}
