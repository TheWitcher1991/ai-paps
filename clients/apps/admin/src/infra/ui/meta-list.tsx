import { cn } from '~infra/ui/lib/utils'
import { LucideIcon } from 'lucide-react'

export interface MetaListProps {
  children: React.ReactNode
  className?: string
}

export function MetaList({ children, className }: MetaListProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {children}
    </div>
  )
}

export interface MetaListItemProps {
  icon?: LucideIcon
  title: string
  children?: React.ReactNode
}

export function MetaListItem({ icon: Icon, title, children }: MetaListItemProps) {
  return (
    <div className="flex items-center gap-3">
      {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      <span className="text-sm text-muted-foreground">{title}</span>
      {children}
    </div>
  )
}
