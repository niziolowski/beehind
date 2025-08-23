import { create } from 'zustand'

interface SettingsState {
  databaseLocation: string | null
  initialize: () => Promise<void>
}

export const useSettingsStore = create<SettingsState>((set) => ({
  databaseLocation: null,
  initialize: async () => {
    try {
      // Fetch initial values
      const databaseLocation = await window.api.database.getDatabasePath()

      // Update state with initial values
      set({
        databaseLocation
      })
    } catch (error) {
      throw new Error('Failed to initialize settings store')
    }
  }
}))
