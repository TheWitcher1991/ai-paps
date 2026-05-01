'use client'

import { useEffect } from 'react'
import { useAssets } from '~models/asset'
import { useUnit } from 'effector-react'
import { $store, setList, setCount, setLoading } from '~widgets/assets/assets.store'
import { AssetsFilter } from '~widgets/assets/assets-filter/assets-filter'
import { AssetsPagination } from '~widgets/assets/assets-pagination/assets-pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~infra/ui/table'
import { DataLoader } from '~infra/lib/data-loader'
import { ActionButton } from '~infra/ui/action-button'
import { FileImage, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { IAsset } from '@wcsc/models'

interface AssetsWidgetProps {
  datasetId: number
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function AssetsWidget({ datasetId }: AssetsWidgetProps) {
  const { list, loading, error, filter } = useUnit($store)
  const { data, isLoading, isFetching } = useAssets({
    dataset: datasetId as any,
    page: filter.page,
    page_size: filter.page_size,
  } as any)

  useEffect(() => {
    if (data?.data) {
      setList(data.data.results as IAsset[])
      setCount(data.data.count)
    }
  }, [data])

  useEffect(() => {
    setLoading(isLoading || isFetching)
  }, [isLoading, isFetching])

  return (
    <div className="flex flex-col gap-4">
      <AssetsFilter />

      <DataLoader loading={loading} error={error} empty={list.length === 0}>
        {filter.view === 'grid' ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {list.map((asset: IAsset) => (
              <Link key={asset.id} href={`/workspace/datasets/assets/${asset.id}`} className="block">
                <div className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-card">
                  <div className="flex h-full items-center justify-center">
                    <FileImage className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-2">
                    <p className="truncate text-xs font-medium">{asset.file_name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Формат</TableHead>
                <TableHead>Размер</TableHead>
                <TableHead>Разрешение</TableHead>
                <TableHead>Аннотации</TableHead>
                <TableHead className="w-[80px]">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((asset: IAsset) => (
                <TableRow key={asset.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileImage className="h-4 w-4 text-muted-foreground" />
                      <Link href={`/workspace/datasets/assets/${asset.id}`} className="font-medium text-primary hover:underline">
                        {asset.file_name}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{asset.file_format ?? '—'}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatBytes(asset.file_size)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{asset.width}×{asset.height}</TableCell>
                  <TableCell className="text-sm">{asset.annotations?.length ?? 0}</TableCell>
                  <TableCell>
                    <ActionButton icon={ExternalLink} variant="ghost" title="Открыть" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DataLoader>

      <AssetsPagination />
    </div>
  )
}
