import { createOpenAI } from '@ai-sdk/openai'
import { generateText, type CoreMessage } from 'ai'
import type { AIProvider } from '../ai-provider.interface'
import type { ChatMessage } from '../ai-provider.interface'

export function createOpenAIProvider(apiKey: string, model: string): AIProvider {
  const openai = createOpenAI({ apiKey })
  const modelId = model || 'gpt-4o-mini'

  return {
    async chat(options) {
      const { prompt, messages } = options
      if (prompt) {
        const result = await generateText({ model: openai(modelId), prompt })
        return result.text
      }
      const result = await generateText({
        model: openai(modelId),
        messages: toSdkMessages(messages ?? []) as CoreMessage[],
      })
      return result.text
    },

    async vision(options) {
      const result = await generateText({
        model: openai(modelId),
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
