import { RequestActions } from '../request-actions'
import { useMemo } from 'react'

import { IRequest } from '@wcsc/models'
import { formatDateInRu } from '@wcsc/toolkit'

export const useRequestTableData = (requests: IRequest[]) =>
	useMemo(
		() =>
			requests.map(request => ({
				name: `RQ ${request.operation.target} #${request.operation.project_id || request.operation.task_id || request.operation.job_id}`,
				owner: request.owner.username,
				status: request.status,
				format: request.operation.format,
				expiry_date: formatDateInRu(request.expiry_date),
				actions: <RequestActions request={request} />,
			})),
		[requests],
	)
