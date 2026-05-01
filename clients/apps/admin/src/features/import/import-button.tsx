import { Button } from '~components/ui/button'
import { Upload } from 'lucide-react'

export function ImportButton() {
  return (
    <Button variant="outline" size="sm">
      <Upload className="mr-2 h-4 w-4" />
      Импорт датасета
    </Button>
  )
}
