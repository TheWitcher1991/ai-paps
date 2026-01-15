'use client'

import { ArrowRightToSquare } from '@gravity-ui/icons'
import { Button, Icon, PasswordInput } from '@gravity-ui/uikit'

import { FormCard, FormSection, Spacing } from '~packages/ui'

export const LoginForm = () => {
	return (
		<FormCard title={'Войти'} width={400}>
			<FormSection label={'Токен доступа'}>
				<PasswordInput
					placeholder={'Введите токен доступа'}
					type={'email'}
					size={'xl'}
				/>
			</FormSection>

			<Spacing />

			<Button view={'action'} size={'xl'} type={'submit'} width={'max'}>
				<Icon size={18} data={ArrowRightToSquare} />
				Войти в пространство
			</Button>
		</FormCard>
	)
}
