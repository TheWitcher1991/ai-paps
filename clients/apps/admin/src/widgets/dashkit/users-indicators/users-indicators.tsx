'use client'

import { useUsers } from '~models/user'
import { ValueCard } from '~infra/ui/value-card'
import { Users } from 'lucide-react'

export function UsersIndicators() {
  const { data, isLoading } = useUsers()

  if (isLoading) {
    return <div className="h-20 animate-pulse rounded-lg bg-card" />
  }

  return (
    <ValueCard title="Пользователи" value={data?.data?.count ?? 0} icon={Users} />
  )
}
