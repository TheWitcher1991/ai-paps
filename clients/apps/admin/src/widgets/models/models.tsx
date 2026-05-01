'use client'

import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { useModels } from '~models/model'
import { $store, setList, setCount, setLoading } from '~widgets/models/models.store'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~components/ui/card'
import { Badge } from '~components/ui/badge'
import { Brain, ExternalLink } from 'lucide-react'
import { ActionButton } from '~infra/ui/action-button'
import { DataLoader } from '~infra/lib/data-loader'
import Link from 'next/link'

export function ModelsWidget() {
  const { list, loading, error } = useUnit($store)
  const { data, isLoading, isFetching } = useModels()

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
        {list.map((model: any) => (
          <Card key={model.id} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Brain className="h-4 w-4 text-primary" />
                  <Link href={`/workspace/models/${model.id}`} className="hover:underline">
                    {model.name}
                  </Link>
                </CardTitle>
                <ActionButton icon={ExternalLink} variant="ghost" size="sm" />
              </div>
              <CardDescription>{model.framework} • {model.backbone}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{model.task ?? '—'}</Badge>
                {model.version && <Badge variant="secondary">v{model.version}</Badge>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DataLoader>
  )
}
