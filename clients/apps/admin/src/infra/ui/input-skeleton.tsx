import { cn } from '~infra/ui/lib/utils'

export interface InputSkeletonProps {
  className?: string
}

export function InputSkeleton({ className }: InputSkeletonProps) {
  return (
    <div
      className={cn(
        'h-9 animate-pulse rounded-md bg-muted',
        className,
      )}
    />
  )
}
