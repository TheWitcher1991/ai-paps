import { pluralize } from '@fgis/toolkit'

import { useMemoizedFn } from './use-memoized-fn'

export const usePluralize = () => useMemoizedFn(pluralize)