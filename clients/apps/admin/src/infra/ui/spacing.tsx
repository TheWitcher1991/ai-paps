import { cn } from '~infra/ui/lib/utils'

const spacingMap = {
  xss: '0.25rem',
  xs: '0.5rem',
  s: '0.75rem',
  m: '1rem',
  ml: '1.25rem',
  l: '1.5rem',
  xl: '2rem',
}

export interface SpacingProps {
  v?: keyof typeof spacingMap
  className?: string
}

export function Spacing({ v = 'm', className }: SpacingProps) {
  return <div className={cn('w-full', className)} style={{ height: spacingMap[v] }} />
}
