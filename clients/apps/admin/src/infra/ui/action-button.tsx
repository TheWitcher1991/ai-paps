import { LucideIcon } from 'lucide-react'
import { cn } from '~infra/ui/lib/utils'

export interface ActionButtonProps {
  onClick?: () => void
  icon?: LucideIcon
  loading?: boolean
  disabled?: boolean
  variant?: 'default' | 'destructive' | 'ghost' | 'outline'
  size?: 'sm' | 'md'
  className?: string
  title?: string
  children?: React.ReactNode
}

export function ActionButton({
  onClick,
  icon: Icon,
  loading,
  disabled,
  variant = 'ghost',
  size = 'sm',
  className,
  title,
  children,
}: ActionButtonProps) {
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary-hover',
    destructive: 'text-destructive hover:bg-destructive/10',
    ghost: 'text-muted-foreground hover:text-foreground hover:bg-accent',
    outline: 'border border-border bg-transparent hover:bg-accent',
  }

  const sizeClasses = {
    sm: 'h-8 w-8 p-0',
    md: 'h-9 px-3',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      title={title}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {loading ? (
        <div className="h-4 w-4 animate-spin rounded-full border border-current border-t-transparent" />
      ) : Icon ? (
        <Icon className="h-4 w-4" />
      ) : null}
      {children}
    </button>
  )
}
