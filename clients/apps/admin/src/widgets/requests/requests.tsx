'use client'

import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { useRequests } from '~models/request'
import { $store, setList, setCount, setLoading } from '~widgets/requests/requests.store'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~infra/ui/table'
import { Badge } from '~components/ui/badge'
import { ActionButton } from '~infra/ui/action-button'
import { DataLoader } from '~infra/lib/data-loader'
import { ExternalLink, Download } from 'lucide-react'

export function RequestsWidget() {
  const { list, loading, error } = useUnit($store)
  const { data, isLoading, isFetching } = useRequests()

  useEffect(() => { if (data?.data) { setList(data.data.results); setCount(data.data.count) } }, [data])
  useEffect(() => { setLoading(isLoading || isFetching) }, [isLoading, isFetching])

  return (
    <DataLoader loading={loading} error={error} empty={list.length === 0}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Владелец</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Формат</TableHead>
            <TableHead>Истекает</TableHead>
            <TableHead className="w-[100px]">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((req: any) => (
            <TableRow key={req.id}>
              <TableCell className="font-medium">{req.name ?? `Request #${req.id}`}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{req.owner?.username ?? '—'}</TableCell>
              <TableCell><Badge>{req.status}</Badge></TableCell>
              <TableCell>{req.format ?? '—'}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {req.expiry_date ? new Date(req.expiry_date).toLocaleDateString('ru-RU') : '—'}
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <ActionButton icon={ExternalLink} variant="ghost" title="Открыть" />
                  <ActionButton icon={Download} variant="ghost" title="Скачать" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DataLoader>
  )
}
