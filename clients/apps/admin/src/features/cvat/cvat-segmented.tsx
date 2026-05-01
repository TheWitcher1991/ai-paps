import { cn } from '~infra/ui/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface CvatTab {
  label: string
  href: string
}

const tabs: CvatTab[] = [
  { label: 'Проекты', href: '/workspace/cvat/projects' },
  { label: 'Задачи', href: '/workspace/cvat/tasks' },
  { label: 'Джобы', href: '/workspace/cvat/jobs' },
  { label: 'Запросы', href: '/workspace/cvat/requests' },
]

export function CvatSegmented() {
  const pathname = usePathname()

  return (
    <div className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all',
              isActive
                ? 'bg-background text-foreground shadow'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {tab.label}
          </Link>
        )
      })}
    </div>
  )
}
