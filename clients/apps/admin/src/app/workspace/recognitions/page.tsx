'use client'

import { useState, useRef } from 'react'
import { useMount } from '@wcsc/hooks'
import { setBreadcrumbs } from '~widgets/nav'
import { PageTitle, Group, FormCard, FormSection } from '~infra/ui'
import { Button } from '~components/ui/button'
import { Card, CardContent } from '~components/ui/card'
import { Badge } from '~components/ui/badge'
import { Input } from '~components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~components/ui/select'
import { Alert, AlertDescription } from '~components/ui/alert'
import { Upload, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react'
import { cn } from '~infra/ui/lib/utils'

export default function RecognitionsPage() {
  const [image, setImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [predictions, setPredictions] = useState<any[]>([])
  const [modelId, setModelId] = useState('')
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useMount(() =>
    setBreadcrumbs([
      { text: 'Дашборд', href: '/workspace' },
      { text: 'Мониторинг', href: '/workspace/recognitions' },
    ]),
  )

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Пожалуйста, выберите изображение')
      return
    }

    setError(null)
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = (ev) => setImage(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handlePredict = async () => {
    if (!imageFile || !modelId) return

    setIsUploading(true)
    setError(null)
    setPredictions([])

    try {
      // TODO: Call usePredict(modelId, imageFile)
      await new Promise((r) => setTimeout(r, 1500))
      setPredictions([
        { class: 'Class 1', confidence: 0.92 },
        { class: 'Class 2', confidence: 0.78 },
      ])
    } catch {
      setError('Ошибка при предсказании')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Group>
      <PageTitle title="Мониторинг" subtitle="Распознавание и инференс" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Upload Section */}
        <FormCard title="Загрузка изображения">
          <div className="flex flex-col gap-4">
            <FormSection label="Модель">
              <Select value={modelId} onValueChange={setModelId}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите модель" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Модель #1</SelectItem>
                  <SelectItem value="2">Модель #2</SelectItem>
                </SelectContent>
              </Select>
            </FormSection>

            <div
              className={cn(
                'flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 transition-colors hover:border-primary/50',
                image && 'border-primary/50 bg-primary/5',
              )}
              onClick={() => fileInputRef.current?.click()}
            >
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt="Uploaded" className="max-h-64 max-w-full rounded object-contain" />
              ) : (
                <>
                  <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Нажмите или перетащите изображение</p>
                </>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button onClick={handlePredict} disabled={!imageFile || !modelId || isUploading}>
              {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ImageIcon className="mr-2 h-4 w-4" />}
              Распознать
            </Button>
          </div>
        </FormCard>

        {/* Results Section */}
        <FormCard title="Результаты">
          {predictions.length > 0 ? (
            <div className="space-y-3">
              {predictions.map((pred, i) => (
                <Card key={i}>
                  <CardContent className="flex items-center justify-between p-4">
                    <span className="font-medium">{pred.class}</span>
                    <Badge variant={pred.confidence > 0.8 ? 'success' : 'warning'}>
                      {(pred.confidence * 100).toFixed(1)}%
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ImageIcon className="mb-2 h-12 w-12 text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground">Нет результатов</p>
              <p className="text-xs text-muted-foreground/60">Загрузите изображение для распознавания</p>
            </div>
          )}
        </FormCard>
      </div>
    </Group>
  )
}
