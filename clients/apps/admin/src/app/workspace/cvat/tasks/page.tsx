'use client'

import { useMount } from '@wcsc/hooks'
import { setBreadcrumbs } from '~widgets/nav'
import { PageTitle, Group } from '~infra/ui'
import { TasksWidget } from '~widgets/tasks'
import { CvatSegmented } from '~features/cvat'

export default function CVATTasksPage() {
  useMount(() =>
    setBreadcrumbs([
      { text: 'Дашборд', href: '/workspace' },
      { text: 'Интеграция CVAT', href: '/workspace/cvat/tasks' },
      { text: 'Задачи', href: '/workspace/cvat/tasks' },
    ]),
  )

  return (
    <Group>
      <div className="flex items-center justify-between">
        <PageTitle title="Задачи CVAT" subtitle="Управление задачами аннотации" />
        <CvatSegmented />
      </div>
      <TasksWidget />
    </Group>
  )
}
