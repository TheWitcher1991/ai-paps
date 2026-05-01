import { ActionButton } from '~infra/ui/action-button'
import { ExternalLink, Trash2, Edit } from 'lucide-react'

export function DatasetActions({ dataset: _dataset, onView, onDelete }: { dataset: any; onView?: () => void; onDelete?: () => void }) {
  return (
    <div className="flex gap-1">
      <ActionButton icon={ExternalLink} variant="ghost" onClick={onView} title="Открыть" />
      <ActionButton icon={Edit} variant="ghost" onClick={() => {}} title="Редактировать" />
      <ActionButton icon={Trash2} variant="destructive" onClick={onDelete} title="Удалить" />
    </div>
  )
}
