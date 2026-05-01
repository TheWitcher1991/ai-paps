import { cn } from '~infra/ui/lib/utils'

export interface SkeletonProps {
  width?: string | number
  height?: string | number
  className?: string
}

export function Skeleton({ width, height, className }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      style={{ width, height }}
    />
  )
}
