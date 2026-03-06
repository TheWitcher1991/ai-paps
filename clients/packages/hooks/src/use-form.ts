import { useForm as _useForm } from 'react-hook-form'
import type { FieldPath, FieldPathValue, UseFormProps } from 'react-hook-form'

import { useMemoizedFn } from './use-memoized-fn'

export const useForm = <T extends Record<string, any>>(
	props?: UseFormProps<T>,
) => {
	const {
		control,
		register,
		handleSubmit,
		setError,
		setValue,
		reset,
		getValues,
		watch,
		formState: { errors },
		clearErrors,
		trigger,
	} = _useForm<T>(props)

	const get = useMemoizedFn(
		<N extends FieldPath<T>>(name: N): FieldPathValue<T, N> => {
			return watch(name) as FieldPathValue<T, N>
		},
	)

	const set = useMemoizedFn(
		(
			name: FieldPath<T>,
			value: FieldPathValue<T, typeof name>,
			options?: Parameters<typeof setValue>[2],
		) => {
			setValue(name, value, options)
		},
	)

	const err = useMemoizedFn((name: FieldPath<T>, message: string) => {
		setError(name, { message })
	})

	const setField = useMemoizedFn(
		(
			name: FieldPath<T>,
			value: FieldPathValue<T, typeof name>,
			clearError: boolean = true,
		) => {
			set(name, value)
			if (clearError) {
				err(name, '')
			}
		},
	)

	return {
		control,
		register,
		setField,
		handleSubmit,
		reset,
		getValues,
		errors,
		clearErrors,
		get,
		set,
		err,
		trigger,
	}
}