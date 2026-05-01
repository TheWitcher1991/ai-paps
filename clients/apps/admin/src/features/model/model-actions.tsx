import { ActionButton } from '~infra/ui/action-button'
import { ExternalLink } from 'lucide-react'

export function ModelActions({ model: _model, onView }: { model: any; onView?: () => void }) {
  return (
    <div className="flex gap-1">
      <ActionButton icon={ExternalLink} variant="ghost" onClick={onView} title="Открыть" />
    </div>
  )
}
