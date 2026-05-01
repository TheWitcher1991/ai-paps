import { cn } from '~infra/ui/lib/utils'

export interface ActionsProps {
  children: React.ReactNode
  className?: string
  justifyContent?: 'start' | 'center' | 'end' | 'between'
}

export function Actions({ children, className, justifyContent = 'start' }: ActionsProps) {
  const justifyMap = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
  }

  return (
    <div className={cn('flex items-center gap-2', justifyMap[justifyContent], className)}>
      {children}
    </div>
  )
}
