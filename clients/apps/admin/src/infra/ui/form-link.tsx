import Link from 'next/link'
import { cn } from '~infra/ui/lib/utils'

export interface FormLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function FormLink({ href, children, className }: FormLinkProps) {
  return (
    <Link
      href={href}
      className={cn('text-sm text-primary hover:text-primary-hover hover:underline', className)}
    >
      {children}
    </Link>
  )
}
