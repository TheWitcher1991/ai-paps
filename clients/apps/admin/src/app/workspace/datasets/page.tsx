'use client'

import { useMount } from '@wcsc/hooks'
import { setBreadcrumbs } from '~widgets/nav'
import { PageTitle, Group } from '~infra/ui'
import { DatasetsWidget } from '~widgets/datasets'

export default function DatasetsPage() {
  useMount(() =>
    setBreadcrumbs([
      { text: 'Дашборд', href: '/workspace' },
      { text: 'Датасеты', href: '/workspace/datasets' },
    ]),
  )

  return (
    <Group>
      <PageTitle
        title="Датасеты"
        subtitle="Управление наборами данных"
      />
      <DatasetsWidget />
    </Group>
  )
}
