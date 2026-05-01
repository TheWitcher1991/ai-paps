import { cn } from '~infra/ui/lib/utils'

export interface GroupProps {
  children: React.ReactNode
  className?: string
}

export function Group({ children, className }: GroupProps) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {children}
    </div>
  )
}
