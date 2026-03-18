import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import type { DietType } from '../../src/types/profile'
import { useProfileStore } from '../../src/stores/profile.store'

const mockApi = {
  profile: {
    get: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
  },
}

vi.stubGlobal('window', { api: mockApi })

describe('useProfileStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.mocked(mockApi.profile.get).mockResolvedValue(null)
    vi.mocked(mockApi.profile.save).mockResolvedValue(undefined)
  })

  it('starts with null profile', async () => {
    const store = useProfileStore()
    expect(store.profile).toBeNull()
  })

  it('fetchProfile calls window.api.profile.get', async () => {
    const store = useProfileStore()
    const profile = {
      id: '123',
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
    mockApi.profile.get.mockResolvedValue(profile)
    await store.fetchProfile()
    expect(store.profile).toEqual(profile)
    expect(store.hasProfile).toBe(true)
  })

  it('saveProfile calls IPC and updates profile', async () => {
    const store = useProfileStore()
    await store.saveProfile({
      name: 'Alex',
      age: 30,
      sex: 'male',
      weightKg: 75,
      heightCm: 178,
      activityLevel: 'moderate',
      goals: ['eat_healthier'],
      diets: [],
      allergies: [],
      nutritionPreferences: [],
      onboardingCompleted: true,
    })
    expect(mockApi.profile.save).toHaveBeenCalled()
    expect(store.profile?.name).toBe('Alex')
    expect(store.profile?.id).toBeDefined()
  })
})
