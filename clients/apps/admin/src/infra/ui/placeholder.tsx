import { cn } from '~infra/ui/lib/utils'

export interface PlaceholderProps {
  title?: string
  text?: string
  className?: string
}

export function Placeholder({ title, text, className }: PlaceholderProps) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center gap-2 py-12 text-center',
      className,
    )}>
      {title && <p className="text-lg font-medium text-muted-foreground">{title}</p>}
      {text && <p className="text-sm text-muted-foreground/60">{text}</p>}
    </div>
  )
}
