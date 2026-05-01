'use client'

import { useMount } from '@wcsc/hooks'
import { setBreadcrumbs } from '~widgets/nav'
import { PageTitle, Group } from '~infra/ui'
import { ProjectsWidget } from '~widgets/projects'
import { CvatSegmented } from '~features/cvat'

export default function CVATProjectsPage() {
  useMount(() =>
    setBreadcrumbs([
      { text: 'Дашборд', href: '/workspace' },
      { text: 'Интеграция CVAT', href: '/workspace/cvat/projects' },
      { text: 'Проекты', href: '/workspace/cvat/projects' },
    ]),
  )

  return (
    <Group>
      <div className="flex items-center justify-between">
        <PageTitle title="Проекты CVAT" subtitle="Управление проектами аннотации" />
        <CvatSegmented />
      </div>
      <ProjectsWidget />
    </Group>
  )
}
