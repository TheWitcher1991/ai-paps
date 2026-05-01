import { cn } from '~infra/ui/lib/utils'

export interface DividerProps {
  className?: string
}

export function Divider({ className }: DividerProps) {
  return (
    <div className={cn('h-px w-full bg-border', className)} />
  )
}
