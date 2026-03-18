/**
 * Provider-agnostic interface for AI chat and vision.
 * All provider adapters implement this interface; services use it via the ai-client factory.
 */
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content:
    | string
    | Array<
        | { type: 'text'; text: string }
        | { type: 'image'; image: Buffer | string; mediaType?: string }
      >
}

export interface AIProvider {
  /** Generate text from a prompt or messages. For vision, pass messages with image parts. */
  chat(options: { prompt?: string; messages?: ChatMessage[] }): Promise<string>

  /** Alias for chat with image content. Use messages with ImagePart for vision analysis. */
  vision(options: { messages: ChatMessage[] }): Promise<string>
}
