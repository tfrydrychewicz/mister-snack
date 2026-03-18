import Store from 'electron-store'
import type { Schema } from 'electron-store'
import type { AISettings, AIProviderName } from '../../src/types/ai'
import type { AISettingsPublic } from '../../src/types/ai'

const ENCRYPTION_KEY = 'mister-snack-ai-settings-v1'

interface SettingsStoreSchema {
  aiSettings: AISettings | null
}

const schema: Schema<SettingsStoreSchema> = {
  aiSettings: {
    type: ['object', 'null'],
    default: null,
  },
}

const store = new Store<SettingsStoreSchema>({
  name: 'mister-snack-settings',
  schema,
  encryptionKey: ENCRYPTION_KEY,
})

const DEFAULT_SETTINGS: AISettings = {
  provider: 'openai',
  model: 'gpt-4o-mini',
  ollamaBaseUrl: 'http://localhost:11434',
}

export function toPublicSettings(settings: AISettings | null): AISettingsPublic | null {
  if (!settings) return null
  return {
    provider: settings.provider,
    model: settings.model,
    hasApiKey: Boolean(settings.apiKey && settings.apiKey.length > 0),
    ollamaBaseUrl: settings.ollamaBaseUrl,
  }
}

export function getSettings(): AISettings | null {
  const stored = store.get('aiSettings')
  return stored ?? null
}

export function getPublicSettings(): AISettingsPublic | null {
  return toPublicSettings(getSettings())
}

export interface SettingsUpdate {
  provider?: AIProviderName
  model?: string
  apiKey?: string
  ollamaBaseUrl?: string
}

export function saveSettings(update: SettingsUpdate): void {
  const current = getSettings() ?? DEFAULT_SETTINGS
  const next: AISettings = {
    ...current,
    ...(update.provider !== undefined && { provider: update.provider }),
    ...(update.model !== undefined && { model: update.model }),
    ...(update.apiKey !== undefined && {
      apiKey: update.apiKey === '' ? undefined : update.apiKey,
    }),
    ...(update.ollamaBaseUrl !== undefined && { ollamaBaseUrl: update.ollamaBaseUrl }),
  }
  store.set('aiSettings', next)
}

export interface TestConnectionResult {
  ok: boolean
  error?: string
}

export async function testConnection(): Promise<TestConnectionResult> {
  const { getAIClient } = await import('./ai/ai-client')
  const client = getAIClient()
  if (!client) {
    return { ok: false, error: 'No AI provider configured. Set provider and API key.' }
  }
  try {
    await client.chat({ prompt: 'Reply with exactly: OK' })
    return { ok: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return { ok: false, error: message }
  }
}

export async function listOllamaModels(baseUrl: string): Promise<string[]> {
  const url = `${baseUrl.replace(/\/$/, '')}/api/tags`
  try {
    const res = await fetch(url)
    if (!res.ok) return []
    const data = (await res.json()) as { models?: Array<{ name: string }> }
    return (data.models ?? []).map((m) => m.name)
  } catch {
    return []
  }
}
