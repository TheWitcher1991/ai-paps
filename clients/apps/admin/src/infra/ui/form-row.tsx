import { cn } from '~infra/ui/lib/utils'

export interface FormRowProps {
  children: React.ReactNode
  className?: string
  gap?: number
}

export function FormRow({ children, className, gap = 4 }: FormRowProps) {
  return (
    <div className={cn('flex flex-wrap items-center', `gap-${gap}`, className)}>
      {children}
    </div>
  )
}
