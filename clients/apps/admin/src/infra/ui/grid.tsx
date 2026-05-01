import { cn } from '~infra/ui/lib/utils'

export interface GridProps {
  children: React.ReactNode
  cols?: number
  colsMd?: number
  colsLg?: number
  gap?: number
  className?: string
}

export function Grid({ children, cols = 1, colsMd, colsLg, gap = 4, className }: GridProps) {
  return (
    <div
      className={cn(
        'grid',
        `grid-cols-${cols}`,
        colsMd && `md:grid-cols-${colsMd}`,
        colsLg && `lg:grid-cols-${colsLg}`,
        `gap-${gap}`,
        className,
      )}
    >
      {children}
    </div>
  )
}
