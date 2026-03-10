'use client'

import { useState } from 'react'

import { setBreadcrumbs } from '~widgets/nav'

import { FormSection, Group, PageTitle, Spacing } from '~infra/ui'

import { useMount } from '@wcsc/hooks'
import { href } from '@wcsc/href'
import { ModelSelect, useModels } from '~models/model'
import { usePredictWithConfidence } from '~models/inference'
import { Button, Card } from '@gravity-ui/uikit'

export default function Recognitions() {
	useMount(() =>
		setBreadcrumbs([{ text: 'Мониторинг', href: href.recognitions.index }]),
	)

	const [selectedImage, setSelectedImage] = useState<File | null>(null)
	const [selectedModelId, setSelectedModelId] = useState<number>(0)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)

	const { data: models } = useModels({})
	const predictMutation = usePredictWithConfidence(selectedModelId as any)

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setSelectedImage(file)
			setPreviewUrl(URL.createObjectURL(file))
		}
	}

	const handlePredict = async () => {
		if (!selectedImage || !selectedModelId) return

		predictMutation.mutate(selectedImage, {
			onSuccess: data => {
				console.log('Prediction result:', data.data)
			},
			onError: error => {
				console.error('Prediction error:', error)
			},
		})
	}

	return (
		<Group>
			<PageTitle
				title={'Мониторинг'}
				subtitle={'Загрузите изображение растения для AI-анализа'}
			/>

			<Card view='filled' style={{ padding: 16 }}>
				<FormSection label={'Модель'}>
					<ModelSelect
						card={true}
						value={selectedModelId}
						onSelect={value => setSelectedModelId(value)}
					/>
				</FormSection>

				<FormSection label={'Загрузите изображение'}><input type="file" accept="image/*" onChange={handleImageChange} /></FormSection>

				{previewUrl && (
					<Group>
						<img
							src={previewUrl}
							alt="Preview"
							style={{ maxWidth: '300px', maxHeight: '300px' }}
						/>
					</Group>
				)}

				<Spacing />

				<Button
					view='action'
					size='l'
					onClick={handlePredict}
					disabled={!selectedImage || !selectedModelId || predictMutation.isPending}
				>
					{predictMutation.isPending ? 'Анализ...' : 'Анализировать'}
				</Button>

				{predictMutation.isError && (
					<div style={{ color: 'red' }}>
						Ошибка: {predictMutation.error?.message}
					</div>
				)}

				{predictMutation.isSuccess && predictMutation.data?.data && (
					<Group>
						<h3>Результат:</h3>
						<pre>{JSON.stringify(predictMutation.data.data, null, 2)}</pre>
					</Group>
				)}
			</Card>





		</Group>
	)
}
