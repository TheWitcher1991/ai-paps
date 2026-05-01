import { LucideIcon } from 'lucide-react'
import { cn } from '~infra/ui/lib/utils'

export interface ValueCardProps {
  value?: string | number
  title: string
  icon?: LucideIcon
  className?: string
}

export function ValueCard({ value, title, icon: Icon, className }: ValueCardProps) {
  return (
    <div className={cn(
      'rounded-lg border border-border bg-card p-4',
      className,
    )}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
        <div>
          {value !== undefined && (
            <p className="text-2xl font-semibold text-foreground">{value}</p>
          )}
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
    </div>
  )
}
