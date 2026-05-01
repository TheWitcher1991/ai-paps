'use client'

import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { useJobs } from '~models/job'
import { $store, setList, setCount, setLoading } from '~widgets/jobs/jobs.store'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~infra/ui/table'
import { Badge } from '~components/ui/badge'
import { ActionButton } from '~infra/ui/action-button'
import { DataLoader } from '~infra/lib/data-loader'
import { ExternalLink, Database } from 'lucide-react'

export function JobsWidget() {
  const { list, loading, error } = useUnit($store)
  const { data, isLoading, isFetching } = useJobs()

  useEffect(() => { if (data?.data) { setList(data.data.results); setCount(data.data.count) } }, [data])
  useEffect(() => { setLoading(isLoading || isFetching) }, [isLoading, isFetching])

  return (
    <DataLoader loading={loading} error={error} empty={list.length === 0}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Размеры</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Тип</TableHead>
            <TableHead>Создан</TableHead>
            <TableHead className="w-[100px]">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((job: any) => (
            <TableRow key={job.id}>
              <TableCell className="font-medium">{job.name ?? `Job #${job.id}`}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{job.dimension ?? '—'}</TableCell>
              <TableCell><Badge>{job.status}</Badge></TableCell>
              <TableCell>{job.type ?? '—'}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {job.created_date ? new Date(job.created_date).toLocaleDateString('ru-RU') : '—'}
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
