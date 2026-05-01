import { cn } from '~infra/ui/lib/utils'

export interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-10', className)}>
      {children}
    </div>
  )
}
