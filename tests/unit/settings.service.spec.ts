/**
 * Unit tests for settings.service.
 * electron-store is mocked to avoid filesystem dependency.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import * as settings from '../../electron/services/settings.service'

const mockStore = new Map<string, unknown>()
vi.mock('electron-store', () => ({
  default: vi.fn().mockImplementation(() => ({
    get: (key: string) => mockStore.get(key),
    set: (key: string, value: unknown) => {
      mockStore.set(key, value)
    },
    delete: (key: string) => mockStore.delete(key),
  })),
}))

describe('settings.service', () => {
  beforeEach(() => {
    mockStore.clear()
  })

  describe('getSettings / getPublicSettings', () => {
    it('returns null when no settings stored', () => {
      expect(settings.getSettings()).toBeNull()
      expect(settings.getPublicSettings()).toBeNull()
    })
  })

  describe('saveSettings', () => {
    it('persists provider and model', () => {
      settings.saveSettings({ provider: 'openai', model: 'gpt-4o' })
      const s = settings.getSettings()
      expect(s?.provider).toBe('openai')
      expect(s?.model).toBe('gpt-4o')
    })

    it('persists apiKey without exposing to getPublicSettings', () => {
      settings.saveSettings({ apiKey: 'sk-secret' })
      const full = settings.getSettings()
      const pub = settings.getPublicSettings()
      expect(full?.apiKey).toBe('sk-secret')
      expect(pub?.hasApiKey).toBe(true)
      expect(pub).not.toHaveProperty('apiKey')
    })

    it('clears apiKey when empty string', () => {
      settings.saveSettings({ apiKey: 'sk-x', provider: 'openai' })
      settings.saveSettings({ apiKey: '' })
      const s = settings.getSettings()
      expect(s?.apiKey).toBeUndefined()
    })
  })

  describe('toPublicSettings', () => {
    it('replaces apiKey with hasApiKey', () => {
      settings.saveSettings({ provider: 'openai', apiKey: 'x' })
      const pub = settings.getPublicSettings()
      expect(pub?.hasApiKey).toBe(true)
      expect('apiKey' in (pub ?? {})).toBe(false)
    })
  })
})
