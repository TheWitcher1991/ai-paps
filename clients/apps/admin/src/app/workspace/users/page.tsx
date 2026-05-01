'use client'

import { useMount } from '@wcsc/hooks'
import { setBreadcrumbs } from '~widgets/nav'
import { PageTitle, Group } from '~infra/ui'
import { UsersWidget } from '~widgets/users'

export default function UsersPage() {
  useMount(() =>
    setBreadcrumbs([
      { text: 'Дашборд', href: '/workspace' },
      { text: 'Пользователи', href: '/workspace/users' },
    ]),
  )

  return (
    <Group>
      <PageTitle title="Пользователи" subtitle="Управление пользователями системы" />
      <UsersWidget />
    </Group>
  )
}
