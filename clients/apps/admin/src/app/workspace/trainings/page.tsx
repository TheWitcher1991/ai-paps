'use client'

import { useMount } from '@wcsc/hooks'
import { setBreadcrumbs } from '~widgets/nav'
import { PageTitle, Group } from '~infra/ui'
import { TrainingsWidget } from '~widgets/trainings'

export default function TrainingsPage() {
  useMount(() =>
    setBreadcrumbs([
      { text: 'Дашборд', href: '/workspace' },
      { text: 'Обучение моделей', href: '/workspace/trainings' },
    ]),
  )

  return (
    <Group>
      <PageTitle title="Обучение моделей" subtitle="Управление процессами обучения" />
      <TrainingsWidget />
    </Group>
  )
}
