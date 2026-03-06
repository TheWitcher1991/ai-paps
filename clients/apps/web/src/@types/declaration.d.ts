import type { SelectProps as SelectComponentProps } from '@gravity-ui/uikit'
import React from 'react'
import type { JSXElementConstructor } from 'react'

declare module '*.css'
declare module '*.scss'
declare module '*.sass'

declare global {
	type ImageData =
		| import('next/dist/shared/lib/get-img-props').StaticImport
		| string

	interface ReactElement<
		P = any,
		T extends string | JSXElementConstructor<any> =
			| string
			| JSXElementConstructor<any>,
	> {
		type: T
		props: P
		key: string | null
	}

	interface SelectProps<T = string, REGISTER = any> {
		defaultValue?: T
		value?: T
		size?: SelectComponentProps['size']
		errorMessage?: Message
		disabled?: boolean
		onSelect?: (value: T) => void
		register?: UseFormRegister<REGISTER>
	}

	type ListViewType = 'list' | 'table'

	type PropsWithAction<P = unknown> = P & {
		view?: ButtonView
		size?: ButtonSize
		width?: ButtonWidth
		onlyIcon?: boolean
	}

	namespace JSX {
		interface Element extends React.ReactElement<any, any> {}
	}
}

export {}
