import { getSettings } from '../settings.service'
import type { AIProvider } from './ai-provider.interface'
import { createOpenAIProvider } from './providers/openai.provider'
import { createAnthropicProvider } from './providers/anthropic.provider'
import { createGoogleProvider } from './providers/google.provider'
import { createOllamaProvider } from './providers/ollama.provider'

/**
 * Factory that reads AISettings from StorageService and returns the active provider adapter.
 * All AI calls go through this factory; no service imports providers directly.
 */
export function getAIClient(): AIProvider | null {
  const settings = getSettings()
  if (!settings) return null

  const { provider, model, apiKey, ollamaBaseUrl } = settings

  switch (provider) {
    case 'openai':
      if (!apiKey) return null
      return createOpenAIProvider(apiKey, model)
    case 'anthropic':
      if (!apiKey) return null
      return createAnthropicProvider(apiKey, model)
    case 'google':
      if (!apiKey) return null
      return createGoogleProvider(apiKey, model)
    case 'ollama':
      return createOllamaProvider(ollamaBaseUrl ?? 'http://localhost:11434', model)
    default:
      return null
  }
}
