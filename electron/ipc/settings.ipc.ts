import { ipcMain } from 'electron'
import { z } from 'zod'
import {
  getPublicSettings,
  saveSettings,
  testConnection,
  listOllamaModels,
} from '../services/settings.service'
import { IPC_CHANNELS } from '../ipc-channels'

const settingsSaveSchema = z.object({
  provider: z.enum(['openai', 'anthropic', 'google', 'ollama']).optional(),
  model: z.string().optional(),
  apiKey: z.string().optional(),
  ollamaBaseUrl: z.string().optional(),
})

const listModelsSchema = z.object({
  baseUrl: z.string(),
})

export function registerSettingsIpc(): void {
  ipcMain.handle(IPC_CHANNELS.SETTINGS_GET, async () => {
    return getPublicSettings()
  })

  ipcMain.handle(IPC_CHANNELS.SETTINGS_SAVE, async (_event, raw: unknown) => {
    const parsed = settingsSaveSchema.safeParse(raw)
    if (!parsed.success) {
      throw new Error('Invalid settings payload')
    }
    saveSettings(parsed.data)
  })

  ipcMain.handle(IPC_CHANNELS.SETTINGS_TEST_CONNECTION, async () => {
    return testConnection()
  })

  ipcMain.handle(IPC_CHANNELS.SETTINGS_LIST_MODELS, async (_event, raw: unknown) => {
    const parsed = listModelsSchema.safeParse(raw)
    if (!parsed.success) {
      return []
    }
    return listOllamaModels(parsed.data.baseUrl)
  })
}
