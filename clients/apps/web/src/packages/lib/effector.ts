import { $session } from '@wcsc/models'
import { API_URL } from '@wcsc/system'
import { createRequestFx } from '@wcsc/toolkit'

export const queryFx = createRequestFx({
	baseURL: API_URL,
	token: $session.getState().jwt,
})
