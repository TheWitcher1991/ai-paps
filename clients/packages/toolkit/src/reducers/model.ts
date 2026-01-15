import { createEvent, createStore } from 'effector'

import { Dictionary } from '@fgis/types'

export const createModelApi = <T = Dictionary<any>>(initialState: T) => {
	const setModel = createEvent<Partial<T>>()

	const $store = createStore<T>(initialState)

	$store.on(setModel, (state, payload) => ({
		...state,
		...payload,
	}))

	return {
		$store,
		setModel,
	}
}