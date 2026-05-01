'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~components/ui/card'
import { Badge } from '~components/ui/badge'
import { Progress } from '~components/ui/progress'
import { Separator } from '~components/ui/separator'
import { MetaList, MetaListItem, Group } from '~infra/ui'
import { GraduationCap, Brain, Database, Clock, BarChart3, Activity } from 'lucide-react'

interface TrainingDetailProps {
  training: any
}

const statusVariant: Record<string, 'default' | 'success' | 'warning' | 'destructive' | 'secondary'> = {
  pending: 'secondary', queued: 'secondary', running: 'default',
  validating: 'warning', finished: 'success', failed: 'destructive', cancelled: 'destructive',
}

export function TrainingDetail({ training }: TrainingDetailProps) {
  if (!training) return null

  const progress = training.current_epoch && training.epochs
    ? Math.min((training.current_epoch / training.epochs) * 100, 100)
    : 0

  return (
    <Group>
      <div className="flex items-center gap-3">
        <GraduationCap className="h-8 w-8 text-primary" />
        <div>
          <h2 className="text-xl font-semibold">{training.name}</h2>
          <Badge variant={statusVariant[training.status] ?? 'default'}>{training.status}</Badge>
        </div>
      </div>

      {progress > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Прогресс обучения</CardTitle>
            <CardDescription>Эпоха {training.current_epoch} из {training.epochs}</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="h-3" />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Brain className="h-4 w-4 text-primary" />
              Модель
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MetaList>
              <MetaListItem title="Название"><span className="text-sm">{training.model?.name ?? '—'}</span></MetaListItem>
              <MetaListItem title="Framework"><span className="text-sm">{training.model?.framework ?? '—'}</span></MetaListItem>
            </MetaList>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Database className="h-4 w-4 text-primary" />
              Датасет
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MetaList>
              <MetaListItem title="Название"><span className="text-sm">{training.dataset?.name ?? '—'}</span></MetaListItem>
              <MetaListItem title="Размер"><span className="text-sm">{training.dataset?.asset_count ?? '—'} ассетов</span></MetaListItem>
            </MetaList>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Clock className="h-4 w-4 text-primary" />
              Параметры
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MetaList>
              <MetaListItem title="Эпохи"><span className="text-sm">{training.epochs ?? '—'}</span></MetaListItem>
              <MetaListItem title="Batch Size"><span className="text-sm">{training.batch_size ?? '—'}</span></MetaListItem>
              <MetaListItem title="Learning Rate"><span className="text-sm">{training.learning_rate ?? '—'}</span></MetaListItem>
            </MetaList>
          </CardContent>
        </Card>
      </div>

      {training.metrics && (
        <>
          <Separator />
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="h-4 w-4 text-primary" />
                Метрики
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {Object.entries(training.metrics).map(([key, value]) => (
                  <div key={key} className="rounded-md border border-border p-3">
                    <p className="text-xs text-muted-foreground capitalize">{key}</p>
                    <p className="mt-1 text-lg font-semibold">{String(value)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </Group>
  )
}
