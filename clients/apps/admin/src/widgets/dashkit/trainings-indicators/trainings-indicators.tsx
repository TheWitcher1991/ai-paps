'use client'

import { useTrainings } from '~models/training'
import { ValueCard } from '~infra/ui/value-card'
import { GraduationCap } from 'lucide-react'

export function TrainingsIndicators() {
  const { data, isLoading } = useTrainings()

  if (isLoading) {
    return <div className="h-20 animate-pulse rounded-lg bg-card" />
  }

  return (
    <ValueCard title="Обучения" value={data?.data?.count ?? 0} icon={GraduationCap} />
  )
}
