import { IDataset } from '@wcsc/models'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '~infra/ui/table'
import { Badge } from '~components/ui/badge'
import { Database, ExternalLink, Trash2 } from 'lucide-react'
import { ActionButton } from '~infra/ui/action-button'
import Link from 'next/link'

const statusColors: Record<string, 'default' | 'success' | 'warning' | 'destructive' | 'secondary'> = {
  uploaded: 'secondary',
  annotation: 'warning',
  completed: 'success',
}

interface DatasetsTableProps {
  datasets: IDataset[]
  loading?: boolean
}

export function DatasetsTable({ datasets, loading }: DatasetsTableProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 animate-pulse rounded-md bg-muted" />
        ))}
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Название</TableHead>
          <TableHead>Формат</TableHead>
          <TableHead>Классы</TableHead>
          <TableHead>Ассеты</TableHead>
          <TableHead>Аннотации</TableHead>
          <TableHead>Источник</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead className="w-[100px]">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {datasets.map((ds) => (
          <TableRow key={ds.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-muted-foreground" />
                <Link
                  href={`/workspace/datasets/${ds.id}`}
                  className="font-medium text-primary hover:underline"
                >
                  {ds.name}
                </Link>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="outline">{ds.format}</Badge>
            </TableCell>
            <TableCell>{ds.count_classes}</TableCell>
            <TableCell>{ds.count_assets}</TableCell>
            <TableCell>{ds.count_annotations}</TableCell>
            <TableCell>
              <Badge variant="secondary">{ds.source}</Badge>
            </TableCell>
            <TableCell>
              <Badge variant={statusColors[ds.status] ?? 'default'}>
                {ds.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-1">
                <ActionButton
                  icon={ExternalLink}
                  variant="ghost"
                  onClick={() => {}}
                  title="Открыть"
                />
                <ActionButton
                  icon={Trash2}
                  variant="destructive"
                  onClick={() => {}}
                  title="Удалить"
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
