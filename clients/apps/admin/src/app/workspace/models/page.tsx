'use client'

import { useMount } from '@wcsc/hooks'
import { setBreadcrumbs } from '~widgets/nav'
import { PageTitle, Group } from '~infra/ui'
import { ModelsWidget } from '~widgets/models'

export default function ModelsPage() {
  useMount(() =>
    setBreadcrumbs([
      { text: 'Дашборд', href: '/workspace' },
      { text: 'Нейронные сети', href: '/workspace/models' },
    ]),
  )

  return (
    <Group>
      <PageTitle title="Нейронные сети" subtitle="Управление моделями" />
      <ModelsWidget />
    </Group>
  )
}
