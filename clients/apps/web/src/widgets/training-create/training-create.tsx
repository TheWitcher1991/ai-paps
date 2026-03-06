'use client'

import { CirclePlay, Plus } from '@gravity-ui/icons'
import { Button, Flex, Icon, TextArea, TextInput } from '@gravity-ui/uikit'
import { IconSchool, IconSettings2 } from '@tabler/icons-react'

import {
	CardIconTitle,
	Divider,
	FormCard,
	FormRow,
	FormSection,
	Group,
	Spacing,
} from '~infra/ui'

export const TrainingCreate = () => {
	return (
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
					/>
				</FormSection>
				<FormSection label={'Описание'}>
					<TextArea
						placeholder={'Обучение сегментации томатов'}
						size={'l'}
						minRows={3}
					/>
				</FormSection>
				<FormSection label={'Модель'}></FormSection>
				<FormSection
					withOutMargin={true}
					label={'Датасеты'}
				></FormSection>
			</FormCard>
			<FormCard>
				<CardIconTitle
					icon={<IconSettings2 />}
					title='Конфигурация обучения'
					caption='Гиперпараметры и настройки процесса'
				/>
				<Spacing />
				<FormRow>
					<FormSection label={'Эпохи'}></FormSection>
					<FormSection label={'Early Stopping'}></FormSection>
				</FormRow>
				<Divider />
				<FormRow>
					<FormSection label={'Learning Rate'}></FormSection>
				</FormRow>
				<Divider />
				<FormRow>
					<FormSection label={'Оптимизатор'}></FormSection>
					<FormSection label={'Loss Function'}></FormSection>
					<FormSection label={'LR Scheduler'}></FormSection>
				</FormRow>
				<Divider />
				<FormRow>
					<FormSection label={'Train Batch Size'}></FormSection>
					<FormSection label={'Validation Batch Size'}></FormSection>
				</FormRow>
				<Divider />
				<FormRow>
					<FormSection label={'Image Width'}></FormSection>
					<FormSection label={'Image Height'}></FormSection>
				</FormRow>
			</FormCard>
			<FormCard>
				<Flex alignItems={'center'} justifyContent={'end'} gap={3}>
					<Button
						view={'action'}
						size={'l'}
						type={'submit'}
						width={'auto'}
					>
						<Icon size={18} data={Plus} />
						Создать
					</Button>
					<Button
						view={'action'}
						size={'l'}
						type={'submit'}
						width={'auto'}
					>
						<Icon size={18} data={CirclePlay} />
						Создать и запустить
					</Button>
				</Flex>
			</FormCard>
		</Group>
	)
}
