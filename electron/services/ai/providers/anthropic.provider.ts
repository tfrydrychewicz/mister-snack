import { createAnthropic } from '@ai-sdk/anthropic'
import { generateText, type CoreMessage } from 'ai'
import type { AIProvider } from '../ai-provider.interface'
import type { ChatMessage } from '../ai-provider.interface'

export function createAnthropicProvider(apiKey: string, model: string): AIProvider {
  const anthropic = createAnthropic({ apiKey })
  const modelId = model || 'claude-3-5-sonnet-latest'

  return {
    async chat(options) {
      const { prompt, messages } = options
      if (prompt) {
        const result = await generateText({ model: anthropic(modelId), prompt })
        return result.text
      }
      const result = await generateText({
        model: anthropic(modelId),
        messages: toSdkMessages(messages ?? []) as CoreMessage[],
      })
      return result.text
    },

    async vision(options) {
      const result = await generateText({
        model: anthropic(modelId),
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
