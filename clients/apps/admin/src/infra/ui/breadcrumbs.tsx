import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '~infra/ui/lib/utils'

export interface BreadcrumbItem {
  text: string
  href?: string
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn('flex items-center gap-1 text-sm', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <div key={index} className="flex items-center gap-1">
            {index > 0 && (
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.text}
              </Link>
            ) : (
              <span className={cn(
                'font-medium',
                isLast ? 'text-foreground' : 'text-muted-foreground',
              )}>
                {item.text}
              </span>
            )}
          </div>
        )
      })}
    </nav>
  )
}
