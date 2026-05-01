'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~components/ui/card'
import { Badge } from '~components/ui/badge'
import { Separator } from '~components/ui/separator'
import { MetaList, MetaListItem, Group } from '~infra/ui'
import { Brain, Cpu, Layers, Calendar, GitBranch } from 'lucide-react'

interface ModelDetailProps {
  model: any
}

export function ModelDetail({ model }: ModelDetailProps) {
  if (!model) return null

  return (
    <Group>
      <div className="flex items-center gap-3">
        <Brain className="h-8 w-8 text-primary" />
        <div>
          <h2 className="text-xl font-semibold">{model.name}</h2>
          <p className="text-sm text-muted-foreground">{model.framework} • {model.backbone}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Cpu className="h-4 w-4 text-primary" />
              Архитектура
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MetaList>
              <MetaListItem title="Framework"><span className="text-sm">{model.framework ?? '—'}</span></MetaListItem>
              <MetaListItem title="Backbone"><span className="text-sm">{model.backbone ?? '—'}</span></MetaListItem>
              <MetaListItem title="Task"><span className="text-sm">{model.task ?? '—'}</span></MetaListItem>
            </MetaList>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Layers className="h-4 w-4 text-primary" />
              Параметры
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MetaList>
              <MetaListItem title="Версия"><Badge variant="outline">v{model.version ?? '1.0'}</Badge></MetaListItem>
              <MetaListItem title="Классы"><span className="text-sm">{model.classes?.length ?? '—'}</span></MetaListItem>
              <MetaListItem title="Размер"><span className="text-sm">{model.size ? `${(model.size / 1024 / 1024).toFixed(1)} MB` : '—'}</span></MetaListItem>
            </MetaList>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="h-4 w-4 text-primary" />
              Информация
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MetaList>
              <MetaListItem title="Создан"><span className="text-sm">{model.created_date ? new Date(model.created_date).toLocaleDateString('ru-RU') : '—'}</span></MetaListItem>
              <MetaListItem title="Обновлён"><span className="text-sm">{model.updated_date ? new Date(model.updated_date).toLocaleDateString('ru-RU') : '—'}</span></MetaListItem>
              <MetaListItem title="Статус"><Badge>{model.status ?? 'ready'}</Badge></MetaListItem>
            </MetaList>
          </CardContent>
        </Card>
      </div>

      {model.description && (
        <>
          <Separator />
          <Card>
            <CardHeader>
              <CardTitle>Описание</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{model.description}</p>
            </CardContent>
          </Card>
        </>
      )}
    </Group>
  )
}
