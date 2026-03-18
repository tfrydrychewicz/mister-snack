import { contextBridge, ipcRenderer } from 'electron'
import { IPC_CHANNELS } from './ipc-channels'

/**
 * The preload script exposes a typed `window.api` surface to the renderer.
 * IPC handlers are registered here incrementally as features are implemented.
 * All channel names are imported from the shared ipc-channels constants file.
 */
const api = {
  settings: {
    get: () => ipcRenderer.invoke(IPC_CHANNELS.SETTINGS_GET),
    save: (payload: {
      provider?: string
      model?: string
      apiKey?: string
      ollamaBaseUrl?: string
    }) => ipcRenderer.invoke(IPC_CHANNELS.SETTINGS_SAVE, payload),
    testConnection: () => ipcRenderer.invoke(IPC_CHANNELS.SETTINGS_TEST_CONNECTION),
    listModels: (baseUrl: string) =>
      ipcRenderer.invoke(IPC_CHANNELS.SETTINGS_LIST_MODELS, { baseUrl }),
  },
} as const

contextBridge.exposeInMainWorld('api', api)

export type WindowApi = typeof api
