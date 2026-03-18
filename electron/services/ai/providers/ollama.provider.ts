import { createOllama } from 'ollama-ai-provider'
import { generateText, type CoreMessage } from 'ai'
import type { AIProvider } from '../ai-provider.interface'
import type { ChatMessage } from '../ai-provider.interface'

const DEFAULT_BASE_URL = 'http://localhost:11434'
const DEFAULT_MODEL = 'llama3.2'

export function createOllamaProvider(baseUrl: string, model: string): AIProvider {
  const baseURL = baseUrl || DEFAULT_BASE_URL
  const ollama = createOllama({ baseURL })
  const modelId = model || DEFAULT_MODEL

  return {
    async chat(options) {
      const { prompt, messages } = options
      if (prompt) {
        const result = await generateText({ model: ollama(modelId), prompt })
        return result.text
      }
      const result = await generateText({
        model: ollama(modelId),
        messages: toSdkMessages(messages ?? []) as CoreMessage[],
      })
      return result.text
    },

    async vision(options) {
      const result = await generateText({
        model: ollama(modelId),
        messages: toSdkMessages(options.messages) as CoreMessage[],
      })
      return result.text
    },
  }
}

function toSdkMessages(messages: ChatMessage[]) {
  return messages.map((m) => ({
    role: m.role,
    content: m.content,
  }))
}
