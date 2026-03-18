import { storageService } from './storage.service'
import type { UserProfile } from '../../src/types/profile'

export function getProfile(): UserProfile | null {
  return storageService.get('userProfile')
}

export function saveProfile(profile: UserProfile): void {
  storageService.set('userProfile', profile)
}
