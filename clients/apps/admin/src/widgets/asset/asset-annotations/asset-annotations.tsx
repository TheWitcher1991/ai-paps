import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~infra/ui/table'
import { Badge } from '~components/ui/badge'

interface AssetAnnotationsProps {
  asset: any
}

export function AssetAnnotations({ asset }: AssetAnnotationsProps) {
  const annotations = asset?.annotations ?? []

  if (!annotations.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card py-8 text-center">
        <p className="text-sm font-medium text-muted-foreground">Нет аннотаций</p>
        <p className="text-xs text-muted-foreground/60">Аннотации для этого ассета отсутствуют</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Класс</TableHead>
          <TableHead>Тип</TableHead>
          <TableHead>Уверенность</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {annotations.map((ann: any, i: number) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{ann.class_name ?? '—'}</TableCell>
            <TableCell><Badge variant="outline">{ann.type ?? '—'}</Badge></TableCell>
            <TableCell>
              {ann.confidence != null ? (
                <Badge variant={ann.confidence > 0.8 ? 'success' : 'warning'}>
                  {(ann.confidence * 100).toFixed(1)}%
                </Badge>
              ) : '—'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
