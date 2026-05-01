'use client'

import { useMount } from '@wcsc/hooks'
import { setBreadcrumbs } from '~widgets/nav'
import { PageTitle, Group } from '~infra/ui'
import { JobsWidget } from '~widgets/jobs'
import { CvatSegmented } from '~features/cvat'

export default function CVATJobsPage() {
  useMount(() =>
    setBreadcrumbs([
      { text: 'Дашборд', href: '/workspace' },
      { text: 'Интеграция CVAT', href: '/workspace/cvat/jobs' },
      { text: 'Джобы', href: '/workspace/cvat/jobs' },
    ]),
  )

  return (
    <Group>
      <div className="flex items-center justify-between">
        <PageTitle title="Джобы CVAT" subtitle="Управление джобами аннотации" />
        <CvatSegmented />
      </div>
      <JobsWidget />
    </Group>
  )
}
