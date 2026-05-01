'use client'

import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { useTrainings } from '~models/training'
import { $store, setList, setCount, setLoading } from '~widgets/trainings/trainings.store'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~components/ui/card'
import { Badge } from '~components/ui/badge'
import { Progress } from '~components/ui/progress'
import { GraduationCap, ExternalLink } from 'lucide-react'
import { ActionButton } from '~infra/ui/action-button'
import { DataLoader } from '~infra/lib/data-loader'
import Link from 'next/link'

const statusIcons: Record<string, string> = {
  pending: '⏳',
  queued: '⏳',
  running: '🔄',
  validating: '🔍',
  finished: '✅',
  failed: '❌',
  cancelled: '⛔',
}

const statusVariant: Record<string, 'default' | 'success' | 'warning' | 'destructive' | 'secondary'> = {
  pending: 'secondary',
  queued: 'secondary',
  running: 'default',
  validating: 'warning',
  finished: 'success',
  failed: 'destructive',
  cancelled: 'destructive',
}

export function TrainingsWidget() {
  const { list, loading, error } = useUnit($store)
  const { data, isLoading, isFetching } = useTrainings()

  useEffect(() => {
    if (data?.data) {
      setList(data.data.results)
      setCount(data.data.count)
    }
  }, [data])

  useEffect(() => {
    setLoading(isLoading || isFetching)
  }, [isLoading, isFetching])

  return (
    <DataLoader loading={loading} error={error} empty={list.length === 0}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((training: any) => (
          <Card key={training.id} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <Link href={`/workspace/trainings/${training.id}`} className="hover:underline">
                    {training.name}
                  </Link>
                </CardTitle>
                <ActionButton icon={ExternalLink} variant="ghost" size="sm" />
              </div>
              <CardDescription>
                Модель: {training.model?.name ?? '—'} • Датасет: {training.dataset?.name ?? '—'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span>{statusIcons[training.status] ?? '❓'}</span>
                  <Badge variant={statusVariant[training.status] ?? 'default'}>
                    {training.status}
                  </Badge>
                </div>
                {training.current_epoch && (
                  <div className="flex items-center gap-2">
                    <Progress
                      value={Math.min(
                        ((training.current_epoch / (training.epochs || 1)) * 100),
                        100,
                      )}
                      className="flex-1"
                    />
                    <span className="text-xs text-muted-foreground">
                      {training.current_epoch}/{training.epochs}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DataLoader>
  )
}
