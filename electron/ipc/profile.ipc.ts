import { ipcMain } from 'electron'
import { userProfileSchema } from '../../src/types/schemas'
import { getProfile, saveProfile } from '../services/profile.service'
import { IPC_CHANNELS } from '../ipc-channels'

export function registerProfileIpc(): void {
  ipcMain.handle(IPC_CHANNELS.PROFILE_GET, async () => {
    return getProfile()
  })

  ipcMain.handle(IPC_CHANNELS.PROFILE_SAVE, async (_event, raw: unknown) => {
    const parsed = userProfileSchema.safeParse(raw)
    if (!parsed.success) {
      throw new Error('Invalid profile payload')
    }
    saveProfile(parsed.data)
  })
}
