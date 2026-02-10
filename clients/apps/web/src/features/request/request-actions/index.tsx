import { RequestDownloadButton, RequestViewButton } from '~models/request'

import { Actions } from '~infra/ui'

import { WithRequest } from '@wcsc/models'

export const RequestActions = ({ request }: WithRequest) => {
	return (
		<Actions>
			<RequestViewButton request={request} onlyIcon={true} />
			<RequestDownloadButton request={request} onlyIcon={true} />
		</Actions>
	)
}
