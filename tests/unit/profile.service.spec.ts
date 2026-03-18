import { describe, it, expect, beforeEach } from 'vitest'
import type { DietType } from '../../src/types/profile'
import * as profileService from '../../electron/services/profile.service'

const mockStore = new Map<string, unknown>()
vi.mock('../../electron/services/storage.service', () => ({
  storageService: {
    get: (key: string) => (mockStore.has(key) ? mockStore.get(key) : null),
    set: (key: string, value: unknown) => mockStore.set(key, value),
  },
}))

describe('profile.service', () => {
  beforeEach(() => {
    mockStore.clear()
  })

  it('getProfile returns null when no profile stored', () => {
    expect(profileService.getProfile()).toBeNull()
  })

  it('saveProfile persists and getProfile retrieves', () => {
    const profile = {
      id: crypto.randomUUID(),
      name: 'Alex',
      age: 30,
      sex: 'male' as const,
      weightKg: 75,
      heightCm: 178,
      activityLevel: 'moderate' as const,
      goals: ['eat_healthier' as const],
      diets: [] as DietType[],
      allergies: [],
      nutritionPreferences: [],
      onboardingCompleted: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    profileService.saveProfile(profile)
    expect(profileService.getProfile()).toEqual(profile)
  })
})
