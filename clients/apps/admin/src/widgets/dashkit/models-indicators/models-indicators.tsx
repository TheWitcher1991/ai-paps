'use client'

import { useModels } from '~models/model'
import { ValueCard } from '~infra/ui/value-card'
import { Brain } from 'lucide-react'

export function ModelsIndicators() {
  const { data, isLoading } = useModels()

  if (isLoading) {
    return <div className="h-20 animate-pulse rounded-lg bg-card" />
  }

  return (
    <ValueCard title="Модели" value={data?.data?.count ?? 0} icon={Brain} />
  )
}
