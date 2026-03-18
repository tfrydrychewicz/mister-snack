/**
 * Shared IPC channel names. Used by preload (renderer) and main process handlers.
 * All channels must be typed in the IpcChannels interface.
 */
export const IPC_CHANNELS = {
  // Settings
  SETTINGS_GET: 'settings:get',
  SETTINGS_SAVE: 'settings:save',
  SETTINGS_TEST_CONNECTION: 'settings:test-connection',
  SETTINGS_LIST_MODELS: 'settings:list-models',
  // Profile (Phase 2)
  PROFILE_GET: 'profile:get',
  PROFILE_SAVE: 'profile:save',
  // Meal plan (Phase 3)
  MEAL_PLAN_GENERATE: 'meal-plan:generate',
  MEAL_PLAN_GET: 'meal-plan:get',
  MEAL_PLAN_UPDATE: 'meal-plan:update',
  // Meal operations (Phase 4–5)
  MEAL_REPLACE: 'meal:replace',
  MEAL_ANALYZE_PHOTO: 'meal:analyze-photo',
} as const

export type IpcChannelName = (typeof IPC_CHANNELS)[keyof typeof IPC_CHANNELS]
