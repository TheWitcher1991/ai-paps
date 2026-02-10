import { useMemo } from 'react'

import { IRequest } from '@wcsc/models'

export const useRequestTableData = (requests: IRequest[]) =>
	useMemo(() => requests.map(request => ({})), [requests])
