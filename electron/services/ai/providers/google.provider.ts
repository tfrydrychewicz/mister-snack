import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateText, type CoreMessage } from 'ai'
import type { AIProvider } from '../ai-provider.interface'
import type { ChatMessage } from '../ai-provider.interface'

export function createGoogleProvider(apiKey: string, model: string): AIProvider {
  const google = createGoogleGenerativeAI({ apiKey })
  const modelId = model || 'gemini-2.0-flash'

  return {
    async chat(options) {
      const { prompt, messages } = options
      if (prompt) {
        const result = await generateText({ model: google(modelId), prompt })
        return result.text
      }
      const result = await generateText({
        model: google(modelId),
        messages: toSdkMessages(messages ?? []) as CoreMessage[],
      })
      return result.text
    },

    async vision(options) {
      const result = await generateText({
        model: google(modelId),
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
