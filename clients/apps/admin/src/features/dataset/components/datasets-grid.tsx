import { IDataset } from '@wcsc/models'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~components/ui/card'
import { Badge } from '~components/ui/badge'
import { Database, ExternalLink } from 'lucide-react'
import { ActionButton } from '~infra/ui/action-button'
import Link from 'next/link'

const statusColors: Record<string, 'default' | 'success' | 'warning' | 'destructive' | 'secondary'> = {
  uploaded: 'secondary',
  annotation: 'warning',
  completed: 'success',
}

interface DatasetsGridProps {
  datasets: IDataset[]
}

export function DatasetsGrid({ datasets }: DatasetsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {datasets.map((ds) => (
        <Card key={ds.id} className="transition-shadow hover:shadow-md">
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Database className="h-4 w-4 text-primary" />
                <Link href={`/workspace/datasets/${ds.id}`} className="hover:underline">
                  {ds.name}
                </Link>
              </CardTitle>
              <ActionButton icon={ExternalLink} variant="ghost" size="sm" />
            </div>
            <CardDescription>{ds.format} • {ds.source}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge variant={statusColors[ds.status] ?? 'default'}>{ds.status}</Badge>
              <span className="text-sm text-muted-foreground">
                {ds.count_classes} классов • {ds.count_assets} ассетов
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
