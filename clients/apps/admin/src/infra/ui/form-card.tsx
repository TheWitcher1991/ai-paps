import { cn } from '~infra/ui/lib/utils'

export interface FormCardProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function FormCard({ title, children, className }: FormCardProps) {
  return (
    <div className={cn('rounded-lg border border-border bg-card p-6', className)}>
      {title && (
        <h3 className="mb-4 text-lg font-medium text-foreground">{title}</h3>
      )}
      {children}
    </div>
  )
}
