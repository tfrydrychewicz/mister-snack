export type AIProviderName = 'openai' | 'anthropic' | 'google' | 'ollama'

export interface AISettings {
  provider: AIProviderName
  model: string
  apiKey?: string
  ollamaBaseUrl?: string
}

/** Settings shape exposed to renderer; apiKey is replaced by hasApiKey. Never send raw keys over IPC. */
export interface AISettingsPublic {
  provider: AIProviderName
  model: string
  hasApiKey: boolean
  ollamaBaseUrl?: string
}

export const PROVIDER_MODELS: Record<AIProviderName, string[]> = {
  openai: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo'],
  anthropic: ['claude-3-5-sonnet-latest', 'claude-3-5-haiku-latest', 'claude-3-opus-latest'],
  google: ['gemini-2.0-flash', 'gemini-2.0-pro'],
  ollama: [],
}

export const PROVIDER_LABELS: Record<AIProviderName, string> = {
  openai: 'OpenAI',
  anthropic: 'Anthropic',
  google: 'Google Gemini',
  ollama: 'Ollama (local)',
}
