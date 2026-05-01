import { cn } from '~infra/ui/lib/utils'
import { ReactNode } from 'react'

export interface TableProps {
  children: ReactNode
  className?: string
}

export function Table({ children, className }: TableProps) {
  return (
    <div className={cn('w-full overflow-auto rounded-lg border border-border', className)}>
      <table className="w-full caption-bottom text-sm">
        {children}
      </table>
    </div>
  )
}

export function TableHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <thead className={cn('[&_tr]:border-b [&_tr]:border-border', className)}>
      {children}
    </thead>
  )
}

export function TableBody({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <tbody className={cn('[&_tr:last-child]:border-0', className)}>
      {children}
    </tbody>
  )
}

export function TableRow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <tr className={cn(
      'border-b border-border transition-colors hover:bg-muted/30 data-[state=selected]:bg-muted',
      className,
    )}>
      {children}
    </tr>
  )
}

export function TableHead({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <th className={cn(
      'h-10 px-3 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
      className,
    )}>
      {children}
    </th>
  )
}

export function TableCell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <td className={cn(
      'px-3 py-2.5 align-middle [&:has([role=checkbox])]:pr-0',
      className,
    )}>
      {children}
    </td>
  )
}

export function TableCaption({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <caption className={cn('mt-2 text-sm text-muted-foreground', className)}>
      {children}
    </caption>
  )
}
