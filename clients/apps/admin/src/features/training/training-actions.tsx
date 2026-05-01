import { ActionButton } from '~infra/ui/action-button'
import { Play, Square } from 'lucide-react'

export function TrainingActions({ training, onStart, onCancel }: { training: any; onStart?: () => void; onCancel?: () => void }) {
  const isRunning = training?.status === 'running'
  return (
    <div className="flex gap-1">
      {!isRunning ? (
        <ActionButton icon={Play} variant="default" onClick={onStart} title="Запустить" />
      ) : (
        <ActionButton icon={Square} variant="destructive" onClick={onCancel} title="Остановить" />
      )}
    </div>
  )
}
