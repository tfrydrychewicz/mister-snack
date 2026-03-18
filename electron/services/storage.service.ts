import Store from 'electron-store'
import type { Schema } from 'electron-store'
import type { UserProfile } from '../../src/types/profile'
import type { MealPlan } from '../../src/types/meal'

/** AI settings are stored in a separate encrypted store via settings.service. */
interface StoreSchema {
  userProfile: UserProfile | null
  mealPlans: MealPlan[]
}

const schema: Schema<StoreSchema> = {
  userProfile: {
    type: ['object', 'null'],
    default: null,
  },
  mealPlans: {
    type: 'array',
    default: [],
  },
}

class StorageService {
  private readonly store: Store<StoreSchema>

  constructor() {
    this.store = new Store<StoreSchema>({ schema, name: 'mister-snack' })
  }

  get<K extends keyof StoreSchema>(key: K): StoreSchema[K] {
    return this.store.get(key)
  }

  set<K extends keyof StoreSchema>(key: K, value: StoreSchema[K]): void {
    this.store.set(key, value)
  }

  delete<K extends keyof StoreSchema>(key: K): void {
    this.store.delete(key)
  }

  clear(): void {
    this.store.clear()
  }

  get storePath(): string {
    return this.store.path
  }
}

export const storageService = new StorageService()
