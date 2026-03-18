import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSettingsStore } from '../../src/stores/settings.store'

const mockApi = {
  settings: {
    get: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
    testConnection: vi.fn().mockResolvedValue({ ok: true }),
    listModels: vi.fn().mockResolvedValue([]),
  },
}

vi.stubGlobal('window', { api: mockApi })

describe('useSettingsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.mocked(mockApi.settings.get).mockResolvedValue(null)
    vi.mocked(mockApi.settings.save).mockResolvedValue(undefined)
    vi.mocked(mockApi.settings.testConnection).mockResolvedValue({ ok: true })
    vi.mocked(mockApi.settings.listModels).mockResolvedValue([])
  })

  it('starts with null settings', async () => {
    const store = useSettingsStore()
    expect(store.settings).toBeNull()
  })

  it('fetchSettings calls window.api.settings.get', async () => {
    const store = useSettingsStore()
    mockApi.settings.get.mockResolvedValue({
      provider: 'openai',
      model: 'gpt-4o-mini',
      hasApiKey: true,
    })
    await store.fetchSettings()
    expect(store.settings?.provider).toBe('openai')
    expect(store.settings?.hasApiKey).toBe(true)
  })

  it('saveSettings calls IPC and refetches', async () => {
    const store = useSettingsStore()
    mockApi.settings.get.mockResolvedValue({
      provider: 'anthropic',
      model: 'claude-3-5-sonnet',
      hasApiKey: false,
    })
    await store.saveSettings({ provider: 'anthropic', model: 'claude-3-5-sonnet' })
    expect(mockApi.settings.save).toHaveBeenCalledWith({
      provider: 'anthropic',
      model: 'claude-3-5-sonnet',
    })
    expect(store.settings?.provider).toBe('anthropic')
  })

  it('hasApiKey is computed from settings', async () => {
    const store = useSettingsStore()
    mockApi.settings.get.mockResolvedValue({ hasApiKey: true, provider: 'openai', model: 'x' })
    await store.fetchSettings()
    expect(store.hasApiKey).toBe(true)
  })
})
