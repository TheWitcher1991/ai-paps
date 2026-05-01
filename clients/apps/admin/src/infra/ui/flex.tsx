import { cn } from '~infra/ui/lib/utils'

export interface FlexProps {
  children: React.ReactNode
  direction?: 'row' | 'column'
  gap?: number
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  className?: string
  wrap?: boolean
}

export function Flex({
  children,
  direction = 'row',
  gap = 0,
  align,
  justify,
  className,
  wrap,
}: FlexProps) {
  const directionMap = {
    row: 'flex-row',
    column: 'flex-col',
  }

  const alignMap = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }

  const justifyMap = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  }

  return (
    <div
      className={cn(
        'flex',
        directionMap[direction],
        align && alignMap[align],
        justify && justifyMap[justify],
        wrap && 'flex-wrap',
        gap > 0 && `gap-${gap}`,
        className,
      )}
    >
      {children}
    </div>
  )
}
