import { Theme, ThemeMode } from '@main/types/database'
import { create } from 'zustand'

interface ThemeState {
  theme: Theme | null
  themeMode: ThemeMode | null
  nativeTheme: Theme | null
  isColors: boolean | null
  setThemeMode: (themeMode: ThemeMode) => void
  setIsColors: (isColors: boolean) => void
  initialize: () => Promise<void>
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: null,
  themeMode: null,
  nativeTheme: null,
  isColors: null,
  setThemeMode: (themeMode) =>
    set((state) => ({ themeMode, theme: themeMode === 'system' ? state.nativeTheme : themeMode })),

  setIsColors: (isColors) => set({ isColors }),
  initialize: async () => {
    try {
      // Fetch initial values
      const themeMode = await window.api.theme.getThemeMode()
      const isColors = await window.api.theme.getThemeIsColors()
      const nativeTheme = await window.api.theme.getNativeTheme()

      // Update state with initial values
      set({
        themeMode,
        isColors,
        nativeTheme,
        theme: themeMode === 'system' ? nativeTheme : themeMode
      })

      // Subscribe to system theme changes
      window.api.theme.onSystemThemeChange(async (newNativeTheme) => {
        // Update state with new native theme
        set((state) => ({
          ...state,
          nativeTheme: newNativeTheme,
          theme: state.themeMode === 'system' ? newNativeTheme : state.themeMode
        }))
        // Update database state
        await window.api.theme.setNativeTheme(newNativeTheme)
      })
    } catch (error) {
      throw new Error('Failed to initialize theme store')
    }
  }
}))
