'use client'

import { useMount } from '@wcsc/hooks'
import { setBreadcrumbs } from '~widgets/nav'
import { PageTitle, Group } from '~infra/ui'
import { DatasetsIndicators, ModelsIndicators, TrainingsIndicators, UsersIndicators } from '~widgets/dashkit'
import { Separator } from '~components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '~components/ui/card'
import { useDatasets } from '~models/dataset'
import { useTrainings } from '~models/training'
import { Badge } from '~components/ui/badge'
import { Spinner } from '~components/ui/spinner'
import Link from 'next/link'

const statusColors: Record<string, 'default' | 'success' | 'warning' | 'destructive' | 'secondary'> = {
  uploaded: 'secondary',
  processing: 'warning',
  ready: 'success',
  error: 'destructive',
}

const trainingStatusColors: Record<string, 'default' | 'success' | 'warning' | 'destructive' | 'secondary'> = {
  pending: 'secondary', queued: 'secondary', running: 'default',
  validating: 'warning', finished: 'success', failed: 'destructive', cancelled: 'destructive',
}

export default function DashboardPage() {
  useMount(() =>
    setBreadcrumbs([{ text: 'Дашборд', href: '/workspace' }]),
  )

  const { data: datasetsData, isLoading: datasetsLoading } = useDatasets()
  const { data: trainingsData, isLoading: trainingsLoading } = useTrainings()

  const recentDatasets = datasetsData?.data?.results?.slice(0, 5) ?? []
  const activeTrainings = trainingsData?.data?.results?.filter((t: any) =>
    ['running', 'pending', 'queued', 'validating'].includes(t.status),
  ).slice(0, 5) ?? []

  return (
    <Group>
      <PageTitle title="Дашборд" subtitle="Обзор системы" />

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <DatasetsIndicators />
        <ModelsIndicators />
        <TrainingsIndicators />
        <UsersIndicators />
      </div>

      <Separator />

      {/* Recent Data */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Recent Datasets */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Последние датасеты</CardTitle>
          </CardHeader>
          <CardContent>
            {datasetsLoading ? (
              <div className="flex justify-center py-4"><Spinner /></div>
            ) : recentDatasets.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">Нет датасетов</p>
            ) : (
              <div className="flex flex-col gap-2">
                {recentDatasets.map((ds: any) => (
                  <div key={ds.id} className="flex items-center justify-between rounded-md border border-border bg-background/50 p-3">
                    <div>
                      <Link href={`/workspace/datasets/${ds.id}`} className="text-sm font-medium text-primary hover:underline">
                        {ds.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">{ds.format} • {ds.source}</p>
                    </div>
                    <Badge variant={statusColors[ds.status] ?? 'default'}>{ds.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Trainings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Активные обучения</CardTitle>
          </CardHeader>
          <CardContent>
            {trainingsLoading ? (
              <div className="flex justify-center py-4"><Spinner /></div>
            ) : activeTrainings.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">Нет активных обучений</p>
            ) : (
              <div className="flex flex-col gap-2">
                {activeTrainings.map((t: any) => (
                  <div key={t.id} className="flex items-center justify-between rounded-md border border-border bg-background/50 p-3">
                    <div>
                      <Link href={`/workspace/trainings/${t.id}`} className="text-sm font-medium text-primary hover:underline">
                        {t.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {t.model?.name ?? '—'} • Эпоха {t.current_epoch ?? 0}/{t.epochs ?? '—'}
                      </p>
                    </div>
                    <Badge variant={trainingStatusColors[t.status] ?? 'default'}>{t.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Group>
  )
}
