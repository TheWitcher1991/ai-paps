'use client'

import { Breadcrumbs } from '~infra/ui'
import { Notifications } from '~features/notifications'
import { ImportButton } from '~features/import'
import { DepartmentButton } from '~features/department'
import { useBreadcrumbs } from './nav.hooks'
import { ThemeButton } from '~features/shared/theme-button'

export function Nav() {
  const crumbs = useBreadcrumbs()

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="flex h-12 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          {crumbs.length > 0 ? (
            <Breadcrumbs items={crumbs} />
          ) : (
            <span className="text-sm font-medium text-primary">PAPS</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <DepartmentButton />
          <ImportButton />
          <ThemeButton />
          <Notifications />
        </div>
      </div>
    </header>
  )
}
