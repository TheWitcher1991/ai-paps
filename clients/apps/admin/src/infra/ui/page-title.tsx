import { cn } from '~infra/ui/lib/utils'

export interface PageTitleProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export function PageTitle({ title, subtitle, action }: PageTitleProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
