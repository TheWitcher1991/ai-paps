import { http } from '~infra/http'

import { createReadonlyDatasetApi } from '@wcsc/models'

const { useDataset, useInfinitDatasets, useDatasets } =
	createReadonlyDatasetApi(http)

export { useDataset, useInfinitDatasets, useDatasets }
