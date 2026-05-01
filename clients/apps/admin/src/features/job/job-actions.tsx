import { ActionButton } from '~infra/ui/action-button'
import { ExternalLink, Database } from 'lucide-react'

export function JobActions({ job: _job }: { job: any }) {
  return (
    <div className="flex gap-1">
      <ActionButton icon={ExternalLink} variant="ghost" title="Открыть" />
      <ActionButton icon={Database} variant="ghost" title="Датасет" />
    </div>
  )
}
