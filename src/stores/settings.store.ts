import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AISettingsPublic, AIProviderName } from '@/types/ai'

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<AISettingsPublic | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const hasApiKey = computed(() => settings.value?.hasApiKey ?? false)
  const provider = computed(() => settings.value?.provider ?? 'openai')
  const model = computed(() => settings.value?.model ?? '')
  const ollamaBaseUrl = computed(() => settings.value?.ollamaBaseUrl ?? 'http://localhost:11434')

  async function fetchSettings(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      settings.value = await window.api.settings.get()
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
    } finally {
      isLoading.value = false
    }
  }

  async function saveSettings(payload: {
    provider?: AIProviderName
    model?: string
    apiKey?: string
    ollamaBaseUrl?: string
  }): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      await window.api.settings.save(payload)
      await fetchSettings()
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function testConnection(): Promise<{ ok: boolean; error?: string }> {
    return window.api.settings.testConnection()
  }

  async function listOllamaModels(baseUrl: string): Promise<string[]> {
    return window.api.settings.listModels(baseUrl)
  }

  return {
    settings,
    isLoading,
    error,
    hasApiKey,
    provider,
    model,
    ollamaBaseUrl,
    fetchSettings,
    saveSettings,
    testConnection,
    listOllamaModels,
  }
})
