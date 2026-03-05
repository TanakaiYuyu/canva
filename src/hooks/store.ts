import { createUseInstanceStoreState } from '@telemetryos/sdk/react'

export const useCanvaUrlStoreState = createUseInstanceStoreState<string>('canvaUrl', '')
export const useRefreshIntervalStoreState = createUseInstanceStoreState<number>('refreshInterval', 60)
