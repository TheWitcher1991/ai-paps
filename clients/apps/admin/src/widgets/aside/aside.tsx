'use client'

import {
  LayoutDashboard,
  BookOpen,
  Boxes,
  Brain,
  GraduationCap,
  Database,
  MonitorCheck,
  Users,
  Brush,
  LifeBuoy,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '~infra/ui/lib/utils'
import { logout } from '@wcsc/models'

interface MenuItem {
  id: string
  title: string
  icon: typeof LayoutDashboard
  href?: string
  divider?: boolean
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', title: 'Дашборд', icon: LayoutDashboard, href: '/workspace' },
  { id: 'directory', title: 'Справочник', icon: BookOpen, href: '/workspace/directory' },
  { id: 'cvat', title: 'Интеграция CVAT', icon: Boxes, href: '/workspace/cvat/projects' },
  { id: 'models', title: 'Нейронные сети', icon: Brain, href: '/workspace/models' },
  { id: 'trainings', title: 'Обучение моделей', icon: GraduationCap, href: '/workspace/trainings' },
  { id: 'datasets', title: 'Датасеты', icon: Database, href: '/workspace/datasets' },
  { id: 'recognitions', title: 'Мониторинг', icon: MonitorCheck, href: '/workspace/recognitions' },
  { id: 'users', title: 'Пользователи', icon: Users, href: '/workspace/users' },
  { id: 'divider-1', title: '', icon: LayoutDashboard, divider: true },
  { id: 'ai-constructor', title: 'AI Конструктор', icon: Brush, href: '/workspace/users' },
  { id: 'support', title: 'Поддержка', icon: LifeBuoy, href: '/workspace/users' },
]

export interface AsideProps {
  children: ReactNode
}

export function Aside({ children }: AsideProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          'flex flex-col border-r border-border bg-card transition-all duration-300',
          collapsed ? 'w-[70px]' : 'w-64',
        )}
      >
        {/* Logo */}
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          {!collapsed && (
            <span className="text-lg font-semibold text-primary">PAPS</span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-2">
          {menuItems.map((item) => {
            if (item.divider) {
              return <div key={item.id} className="my-2 border-t border-border" />
            }

            const isActive = item.href
              ? pathname === item.href || pathname?.startsWith(`${item.href}/`)
              : false

            return (
              <Link
                key={item.id}
                href={item.href || '#'}
                className={cn(
                  'mx-2 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  collapsed && 'mx-1 justify-center px-0',
                )}
                title={collapsed ? item.title : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="truncate">{item.title}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer Actions */}
        <div className="border-t border-border p-2">
          <button
            onClick={() => logout()}
            className={cn(
              'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
              collapsed && 'justify-center px-0',
            )}
            title={collapsed ? 'Выход' : undefined}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Выход</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col overflow-auto">
        {children}
      </div>
    </div>
  )
}
