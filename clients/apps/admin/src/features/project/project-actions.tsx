import { ActionButton } from '~infra/ui/action-button'
import { ExternalLink, Database, Trash2 } from 'lucide-react'

export function ProjectActions({ project: _project }: { project: any }) {
  return (
    <div className="flex gap-1">
      <ActionButton icon={ExternalLink} variant="ghost" title="Открыть" />
      <ActionButton icon={Database} variant="ghost" title="Датасет" />
      <ActionButton icon={Trash2} variant="destructive" title="Удалить" />
    </div>
  )
}
