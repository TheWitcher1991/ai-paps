'use client'

import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { useTasks } from '~models/task'
import { $store, setList, setCount, setLoading } from '~widgets/tasks/tasks.store'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~infra/ui/table'
import { Badge } from '~components/ui/badge'
import { ActionButton } from '~infra/ui/action-button'
import { DataLoader } from '~infra/lib/data-loader'
import { ExternalLink, Database } from 'lucide-react'

export function TasksWidget() {
  const { list, loading, error } = useUnit($store)
  const { data, isLoading, isFetching } = useTasks()

  useEffect(() => {
    if (data?.data) { setList(data.data.results); setCount(data.data.count) }
  }, [data])

  useEffect(() => { setLoading(isLoading || isFetching) }, [isLoading, isFetching])

  return (
    <DataLoader loading={loading} error={error} empty={list.length === 0}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Владелец</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Джобы</TableHead>
            <TableHead>Создан</TableHead>
            <TableHead className="w-[100px]">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((task: any) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.name}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{task.owner?.username ?? '—'}</TableCell>
              <TableCell><Badge>{task.status}</Badge></TableCell>
              <TableCell>{task.job_count ?? '—'}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {task.created_date ? new Date(task.created_date).toLocaleDateString('ru-RU') : '—'}
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <ActionButton icon={ExternalLink} variant="ghost" title="Открыть" />
                  <ActionButton icon={Database} variant="ghost" title="Датасет" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DataLoader>
  )
}
