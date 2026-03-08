'use client'

import { CirclePlay, Plus } from '@gravity-ui/icons'
import {
	Button,
	Flex,
	Icon,
	Slider,
	TextArea,
	TextInput,
} from '@gravity-ui/uikit'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { IconSchool, IconSettings2 } from '@tabler/icons-react'

import {
	LossFunctionSelect,
	ModelSelect,
	OptimizerSelect,
	SchedulerSelect,
} from '~models/model'
import { useCreateTraining } from '~models/training'

import { query, toaster } from '~infra/lib'
import {
	CardIconTitle,
	Divider,
	Form,
	FormCard,
	FormRow,
	FormSection,
	Group,
	LabelInput,
	Spacing,
} from '~infra/ui'

import { useForm } from '@wcsc/hooks'
import {
	ICreateTraining,
	TrainingLossFunction,
	TrainingOptimizer,
	TrainingScheduler,
	WriteableTrainingModel,
} from '@wcsc/models'
import { DatasetSelect } from '~models/dataset'

export const TrainingCreate = () => {
	const createTraining = useCreateTraining()

	const { register, handleSubmit, errors, set, get } =
		useForm<ICreateTraining>({
			defaultValues: {
				name: '',
				description: '',
				dataset_ids: [],
				config: {
					lr_scheduler: TrainingScheduler.STEP,
					optimizer: TrainingOptimizer.ADAM,
					loss_function: TrainingLossFunction.CROSS_ENTROPY,
					epochs: 30,
					early_stopping_patience: 5,
					train_batch_size: 4,
					valid_batch_size: 2,
					learning_rate: 0.0001,
					image_width: 512,
					image_height: 512,
				},
			},
			resolver: valibotResolver(WriteableTrainingModel),
		})

	const createTrainingHandler = async (data: ICreateTraining) => {
		await query(async () => {
			await createTraining.mutateAsync(data)
			toaster.add({
				title: 'Датасет для задачи успешно экспортирован',
				name: 'dataset-exported',
			})
		})
	}

	return (
		<Form>
			<Group>
				<FormCard>
					<CardIconTitle
						icon={<IconSchool />}
						title='Основные параметры'
						caption='Название и описание задачи обучения'
					/>
					<Spacing />
					<FormSection label={'Название'}>
						<TextInput
							placeholder={'Segment Tomatoes'}
							type={'text'}
							size={'l'}
							error={errors.name?.message}
							errorMessage={errors.name?.message}
							{...register('name')}
						/>
					</FormSection>
					<FormSection label={'Описание'}>
						<TextArea
							placeholder={'Обучение сегментации томатов'}
							size={'l'}
							minRows={3}
							error={errors.description?.message}
							errorMessage={errors.description?.message}
							{...register('description')}
						/>
					</FormSection>
					<FormSection label={'Модель'}>
						<ModelSelect
							card={true}
							value={get('model')}
							onSelect={value => set('model', value)}
							errorMessage={errors.model?.message}
						/>
					</FormSection>
					<FormSection
						withOutMargin={true}
						label={'Датасеты'}
					>
						<DatasetSelect value={get('dataset_ids')} errorMessage={errors.dataset_ids?.message} onSelect={value => set('dataset_ids', value)} />
					</FormSection>
				</FormCard>
				<FormCard>
					<CardIconTitle
						icon={<IconSettings2 />}
						title='Конфигурация обучения'
						caption='Гиперпараметры и настройки процесса'
					/>
					<Spacing />
					<FormRow>
						<FormSection
							withOutMargin={true}
							label={'Количество эпох'}
							width='100%'
							value={get('config.epochs')}
						>
							<Slider
								min={1}
								max={200}
								tooltipDisplay='off'
								value={get('config.epochs')}
								onUpdate={value => set('config.epochs', value)}
							/>
						</FormSection>
						<FormSection
							withOutMargin={true}
							label={'Early Stopping'}
							width='100%'
							value={get('config.early_stopping_patience')}
						>
							<Slider
								min={1}
								max={50}
								tooltipDisplay='off'
								value={get('config.early_stopping_patience')}
								onUpdate={value =>
									set('config.early_stopping_patience', value)
								}
							/>
						</FormSection>
					</FormRow>
					<Divider />
					<FormRow>
						<FormSection
							withOutMargin={true}
							label={'Скорость обучения'}
						>
							<LabelInput<number>
								value={get('config.learning_rate')}
								onChange={value =>
									set('config.learning_rate', value)
								}
								labels={[
									{ content: '0.1', value: 0.1 },
									{ content: '0.01', value: 0.01 },
									{ content: '0.001', value: 0.001 },
									{ content: '0.0001', value: 0.0001 },
									{ content: '0.00001', value: 0.00001 },
								]}
							/>
						</FormSection>
					</FormRow>
					<Divider />
					<FormRow>
						<FormSection
							withOutMargin={true}
							label={'Оптимизатор'}
							width='100%'
						>
							<OptimizerSelect
								value={get('config.optimizer')}
								onSelect={value =>
									set('config.optimizer', value)
								}
							/>
						</FormSection>
						<FormSection
							withOutMargin={true}
							label={'Loss Function'}
							width='100%'
						>
							<LossFunctionSelect
								value={get('config.loss_function')}
								onSelect={value =>
									set('config.loss_function', value)
								}
							/>
						</FormSection>
						<FormSection
							withOutMargin={true}
							label={'LR Scheduler'}
							width='100%'
						>
							<SchedulerSelect
								value={get('config.lr_scheduler')}
								onSelect={value =>
									set('config.lr_scheduler', value)
								}
							/>
						</FormSection>
					</FormRow>
					<Divider />
					<FormRow>
						<FormSection
							withOutMargin={true}
							label={'Размер батча для обучения'}
							width='100%'
						>
							<LabelInput<number>
								value={get('config.train_batch_size')}
								onChange={value =>
									set('config.train_batch_size', value)
								}
								labels={[
									{ content: '1', value: 1 },
									{ content: '2', value: 2 },
									{ content: '4', value: 4 },
									{ content: '8', value: 8 },
									{ content: '16', value: 16 },
									{ content: '32', value: 32 },
								]}
							/>
						</FormSection>
						<FormSection
							withOutMargin={true}
							label={'Размер батча для валидации'}
							width='100%'
						>
							<LabelInput<number>
								value={get('config.valid_batch_size')}
								onChange={value =>
									set('config.valid_batch_size', value)
								}
								labels={[
									{ content: '1', value: 1 },
									{ content: '2', value: 2 },
									{ content: '4', value: 4 },
									{ content: '8', value: 8 },
									{ content: '16', value: 16 },
									{ content: '32', value: 32 },
								]}
							/>
						</FormSection>
					</FormRow>
					<Divider />
					<FormRow>
						<FormSection
							width='100%'
							withOutMargin={true}
							label={'Image Width'}
						>
							<LabelInput<number>
								value={get('config.image_width')}
								onChange={value =>
									set('config.image_width', value)
								}
								labels={[
									{ content: '128px', value: 128 },
									{ content: '256px', value: 256 },
									{ content: '512px', value: 512 },
									{ content: '1024px', value: 1024 },
								]}
							/>
						</FormSection>
						<FormSection
							width='100%'
							withOutMargin={true}
							label={'Image Height'}
						>
							<LabelInput<number>
								value={get('config.image_height')}
								onChange={value =>
									set('config.image_height', value)
								}
								labels={[
									{ content: '128px', value: 128 },
									{ content: '256px', value: 256 },
									{ content: '512px', value: 512 },
									{ content: '1024px', value: 1024 },
								]}
							/>
						</FormSection>
					</FormRow>
				</FormCard>
				<FormCard>
					<Flex alignItems={'center'} justifyContent={'end'} gap={3}>
						<Button
							view={'action'}
							size={'l'}
							type={'submit'}
							width={'auto'}
							onClick={handleSubmit(createTrainingHandler)}
							loading={createTraining.isPending}
						>
							<Icon size={18} data={Plus} />
							Создать
						</Button>
						<Button
							view={'action'}
							size={'l'}
							type={'submit'}
							width={'auto'}
							onClick={handleSubmit(createTrainingHandler)}
							loading={createTraining.isPending}
						>
							<Icon size={18} data={CirclePlay} />
							Создать и запустить
						</Button>
					</Flex>
				</FormCard>
			</Group>
		</Form>
	)
}
