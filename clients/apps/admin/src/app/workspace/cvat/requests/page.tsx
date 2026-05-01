'use client'

import { useMount } from '@wcsc/hooks'
import { setBreadcrumbs } from '~widgets/nav'
import { PageTitle, Group } from '~infra/ui'
import { RequestsWidget } from '~widgets/requests'
import { CvatSegmented } from '~features/cvat'

export default function CVATRequestsPage() {
  useMount(() =>
    setBreadcrumbs([
      { text: 'Дашборд', href: '/workspace' },
      { text: 'Интеграция CVAT', href: '/workspace/cvat/requests' },
      { text: 'Запросы', href: '/workspace/cvat/requests' },
    ]),
  )

  return (
    <Group>
      <div className="flex items-center justify-between">
        <PageTitle title="Запросы CVAT" subtitle="Управление запросами экспорта" />
        <CvatSegmented />
      </div>
      <RequestsWidget />
    </Group>
  )
}
