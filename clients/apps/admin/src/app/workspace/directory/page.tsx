'use client'

import { useMount } from '@wcsc/hooks'
import { setBreadcrumbs } from '~widgets/nav'
import { PageTitle, Group, ValueCard } from '~infra/ui'
import { Card, CardContent, CardHeader, CardTitle } from '~components/ui/card'
import { Badge } from '~components/ui/badge'
import { Tags, Bug, CircleAlert, Package } from 'lucide-react'

export default function DirectoryPage() {
  useMount(() =>
    setBreadcrumbs([
      { text: 'Дашборд', href: '/workspace' },
      { text: 'Справочник', href: '/workspace/directory' },
    ]),
  )

  return (
    <Group>
      <PageTitle title="Справочник" subtitle="Классы и категории" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ValueCard title="Классы" value="—" icon={Tags} />
        <ValueCard title="Объекты" value="—" icon={Package} />
        <ValueCard title="Болезни" value="—" icon={CircleAlert} />
        <ValueCard title="Вредители" value="—" icon={Bug} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Классы</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {['class_1', 'class_2', 'class_3'].map((cls) => (
              <Badge key={cls} variant="outline">{cls}</Badge>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Загрузка данных...</p>
        </CardContent>
      </Card>
    </Group>
  )
}
