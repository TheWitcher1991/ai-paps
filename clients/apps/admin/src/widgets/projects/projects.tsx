'use client'

import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { useProjects } from '~models/project'
import { $store, setList, setCount, setLoading } from '~widgets/projects/projects.store'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '~infra/ui/table'
import { Badge } from '~components/ui/badge'
import { ActionButton } from '~infra/ui/action-button'
import { DataLoader } from '~infra/lib/data-loader'
import { ExternalLink, Database, Trash2 } from 'lucide-react'

export function ProjectsWidget() {
  const { list, loading, error } = useUnit($store)
  const { data, isLoading, isFetching } = useProjects()

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Владелец</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Задачи</TableHead>
            <TableHead>Создан</TableHead>
            <TableHead className="w-[120px]">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((project: any) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{project.owner?.username ?? '—'}</TableCell>
              <TableCell>
                <Badge variant={project.status === 'completed' ? 'success' : 'default'}>
                  {project.status}
                </Badge>
              </TableCell>
              <TableCell>{project.task_count ?? '—'}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {project.created_date ? new Date(project.created_date).toLocaleDateString('ru-RU') : '—'}
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <ActionButton icon={ExternalLink} variant="ghost" title="Открыть" />
                  <ActionButton icon={Database} variant="ghost" title="Датасет" />
                  <ActionButton icon={Trash2} variant="destructive" title="Удалить" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DataLoader>
  )
}
