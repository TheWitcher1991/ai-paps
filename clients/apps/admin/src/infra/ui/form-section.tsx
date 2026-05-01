import { cn } from '~infra/ui/lib/utils'

export interface FormSectionProps {
  label: string
  children: React.ReactNode
  className?: string
}

export function FormSection({ label, children, className }: FormSectionProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
    </div>
  )
}
