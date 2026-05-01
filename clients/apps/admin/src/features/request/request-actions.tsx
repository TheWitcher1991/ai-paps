import { ActionButton } from '~infra/ui/action-button'
import { ExternalLink, Download } from 'lucide-react'

export function RequestActions({ request: _request }: { request: any }) {
  return (
    <div className="flex gap-1">
      <ActionButton icon={ExternalLink} variant="ghost" title="Открыть" />
      <ActionButton icon={Download} variant="ghost" title="Скачать" />
    </div>
  )
}
