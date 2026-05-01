import { ReactNode } from 'react'
import { cn } from '~infra/ui/lib/utils'

export interface CardIconTitleProps {
  icon: ReactNode
  title: ReactNode
  caption: ReactNode
  className?: string
}

export function CardIconTitle({ icon, title, caption, className }: CardIconTitleProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
        {icon}
      </div>
      <div className="flex flex-col gap-0">
        <span className="text-base font-medium text-foreground">{title}</span>
        <span className="text-sm text-muted-foreground">{caption}</span>
      </div>
    </div>
  )
}
