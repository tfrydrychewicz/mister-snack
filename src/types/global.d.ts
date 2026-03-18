import type { AISettingsPublic } from './ai'
import type { UserProfile } from './profile'

export interface WindowApi {
  profile: {
    get: () => Promise<UserProfile | null>
    save: (profile: UserProfile) => Promise<void>
  }
  settings: {
    get: () => Promise<AISettingsPublic | null>
    save: (payload: {
      provider?: string
      model?: string
      apiKey?: string
      ollamaBaseUrl?: string
    }) => Promise<void>
    testConnection: () => Promise<{ ok: boolean; error?: string }>
    listModels: (baseUrl: string) => Promise<string[]>
  }
}

declare global {
  interface Window {
    api: WindowApi
  }
}

export {}
