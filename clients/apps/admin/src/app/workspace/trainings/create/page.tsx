'use client'

import { useMount } from '@wcsc/hooks'
import { setBreadcrumbs } from '~widgets/nav'
import { PageTitle, Group } from '~infra/ui'
import { TrainingCreateWidget } from '~widgets/training-create'

export default function TrainingCreatePage() {
  useMount(() =>
    setBreadcrumbs([
      { text: 'Дашборд', href: '/workspace' },
      { text: 'Обучение моделей', href: '/workspace/trainings' },
      { text: 'Создание', href: '/workspace/trainings/create' },
    ]),
  )

  return (
    <Group>
      <PageTitle title="Создание обучения" subtitle="Настройка нового процесса обучения" />
      <TrainingCreateWidget />
    </Group>
  )
}
