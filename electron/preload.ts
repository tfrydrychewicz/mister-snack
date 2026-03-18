import { contextBridge } from 'electron'

/**
 * The preload script exposes a typed `window.api` surface to the renderer.
 * IPC handlers are registered here incrementally as features are implemented.
 * All channel names are imported from the shared ipc-channels constants file.
 */
const api = {
  // IPC methods will be added in Phase 1
} as const

contextBridge.exposeInMainWorld('api', api)

export type WindowApi = typeof api
