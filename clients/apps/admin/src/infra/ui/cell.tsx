import { cn } from '~infra/ui/lib/utils'
import { LucideIcon } from 'lucide-react'

export interface CellProps {
  icon?: LucideIcon
  title?: string
  subtitle?: string
  onClick?: () => void
  className?: string
}

export function Cell({ icon: Icon, title, subtitle, onClick, className }: CellProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-md p-2 transition-colors',
        onClick && 'cursor-pointer hover:bg-accent',
        className,
      )}
      onClick={onClick}
    >
      {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
      <div>
        {title && <p className="text-sm font-medium text-foreground">{title}</p>}
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  )
}
