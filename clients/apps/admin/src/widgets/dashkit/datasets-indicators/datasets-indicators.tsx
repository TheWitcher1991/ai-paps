'use client'

import { useDatasets } from '~models/dataset'
import { ValueCard } from '~infra/ui/value-card'
import { Database } from 'lucide-react'

export function DatasetsIndicators() {
  const { data, isLoading } = useDatasets()

  if (isLoading) {
    return (
      <div className="h-20 animate-pulse rounded-lg bg-card" />
    )
  }

  const total = data?.data?.count ?? 0

  return (
    <ValueCard title="Датасеты" value={total} icon={Database} />
  )
}
