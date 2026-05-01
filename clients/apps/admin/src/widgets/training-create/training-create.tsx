'use client'

import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import * as v from 'valibot'
import { Button } from '~components/ui/button'
import { Input } from '~components/ui/input'
import { Textarea } from '~components/ui/textarea'
import { Label } from '~components/ui/label'
import { Slider } from '~components/ui/slider'
import { Card, CardContent, CardHeader, CardTitle } from '~components/ui/card'
import { Alert, AlertDescription } from '~components/ui/alert'
import { Loader2 } from 'lucide-react'
import { FormSection, FormCard, Spacing, Group } from '~infra/ui'

const trainingSchema = v.object({
  name: v.pipe(
    v.string(),
    v.minLength(3, 'Минимум 3 символа'),
    v.maxLength(255, 'Максимум 255 символов'),
  ),
  description: v.optional(v.string()),
  model_id: v.pipe(v.number(), v.minValue(1, 'Выберите модель')),
  dataset_id: v.pipe(v.number(), v.minValue(1, 'Выберите датасет')),
  epochs: v.pipe(v.number(), v.minValue(1), v.maxValue(1000)),
  early_stopping: v.optional(v.pipe(v.number(), v.minValue(0), v.maxValue(100))),
  learning_rate: v.pipe(v.number(), v.minValue(0.000001), v.maxValue(1)),
  optimizer: v.string(),
  loss_function: v.string(),
  lr_scheduler: v.optional(v.string()),
  batch_size: v.pipe(v.number(), v.minValue(1), v.maxValue(256)),
  image_width: v.pipe(v.number(), v.minValue(32), v.maxValue(4096)),
  image_height: v.pipe(v.number(), v.minValue(32), v.maxValue(4096)),
})

type TrainingFormData = v.InferInput<typeof trainingSchema>

export function TrainingCreateWidget() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TrainingFormData>({
    resolver: valibotResolver(trainingSchema),
    defaultValues: {
      epochs: 100,
      learning_rate: 0.001,
      optimizer: 'adam',
      loss_function: 'mse',
      batch_size: 32,
      image_width: 640,
      image_height: 640,
    },
  })

  const epochs = watch('epochs')

  const onSubmit = async (data: TrainingFormData) => {
    console.log('Create training:', data)
    // TODO: call useCreateTraining mutation
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Group>
        <FormCard title="Основное">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormSection label="Название">
              <Input {...register('name')} placeholder="Введите название обучения" />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </FormSection>

            <FormSection label="Описание">
              <Textarea {...register('description')} placeholder="Описание обучения" />
            </FormSection>
          </div>
        </FormCard>

        <FormCard title="Модель и датасет">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormSection label="Модель">
              <Input
                type="number"
                {...register('model_id', { valueAsNumber: true })}
                placeholder="ID модели"
              />
              {errors.model_id && (
                <p className="text-xs text-destructive">{errors.model_id.message}</p>
              )}
            </FormSection>

            <FormSection label="Датасет">
              <Input
                type="number"
                {...register('dataset_id', { valueAsNumber: true })}
                placeholder="ID датасета"
              />
              {errors.dataset_id && (
                <p className="text-xs text-destructive">{errors.dataset_id.message}</p>
              )}
            </FormSection>
          </div>
        </FormCard>

        <FormCard title="Параметры обучения">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormSection label="Эпохи">
              <div className="flex items-center gap-4">
                <Slider
                  value={[epochs]}
                  min={1}
                  max={1000}
                  step={1}
                  onValueChange={(v) => setValue('epochs', v[0])}
                  className="flex-1"
                />
                <span className="w-12 text-right text-sm tabular-nums">{epochs}</span>
              </div>
            </FormSection>

            <FormSection label="Learning Rate">
              <Input
                type="number"
                step="any"
                {...register('learning_rate', { valueAsNumber: true })}
              />
              {errors.learning_rate && (
                <p className="text-xs text-destructive">{errors.learning_rate.message}</p>
              )}
            </FormSection>

            <FormSection label="Optimizer">
              <Input {...register('optimizer')} placeholder="adam" />
            </FormSection>

            <FormSection label="Loss Function">
              <Input {...register('loss_function')} placeholder="mse" />
            </FormSection>

            <FormSection label="Batch Size">
              <Input
                type="number"
                {...register('batch_size', { valueAsNumber: true })}
              />
              {errors.batch_size && (
                <p className="text-xs text-destructive">{errors.batch_size.message}</p>
              )}
            </FormSection>

            <FormSection label="Early Stopping">
              <Input
                type="number"
                {...register('early_stopping', { valueAsNumber: true })}
                placeholder="0 — отключено"
              />
            </FormSection>
          </div>
        </FormCard>

        <FormCard title="Размер изображения">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormSection label="Ширина">
              <Input
                type="number"
                {...register('image_width', { valueAsNumber: true })}
              />
              {errors.image_width && (
                <p className="text-xs text-destructive">{errors.image_width.message}</p>
              )}
            </FormSection>

            <FormSection label="Высота">
              <Input
                type="number"
                {...register('image_height', { valueAsNumber: true })}
              />
              {errors.image_height && (
                <p className="text-xs text-destructive">{errors.image_height.message}</p>
              )}
            </FormSection>
          </div>
        </FormCard>

        <div className="flex justify-end gap-3">
          <Button variant="outline" type="button">
            Отмена
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Создать обучение
          </Button>
        </div>
      </Group>
    </form>
  )
}
