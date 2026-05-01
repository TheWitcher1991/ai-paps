'use client'

import { useAssets } from '~models/asset'
import { ValueCard } from '~infra/ui/value-card'
import { Image } from 'lucide-react'

export function AssetsIndicators() {
  const { data, isLoading } = useAssets()

  if (isLoading) {
    return <div className="h-20 animate-pulse rounded-lg bg-card" />
  }

  return (
    <ValueCard title="Ассеты" value={data?.data?.count ?? 0} icon={Image} />
  )
}
