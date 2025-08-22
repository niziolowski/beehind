import { Theme, ThemeMode } from '@main/types/database'
import { create } from 'zustand'

interface ThemeState {
  theme: Theme | null
  themeMode: ThemeMode | null
  nativeTheme: Theme | null
  isColors: boolean | null
  setThemeMode: (mode: ThemeMode) => Promise<void>
  setIsColors: (colors: boolean) => void
}

// Create Zustand store with immediate initialization
export const useThemeStore = create<ThemeState>((set) => {
  // Initialize state
  const state: ThemeState = {
    theme: null,
    themeMode: null,
    nativeTheme: null,
    isColors: true,
    setThemeMode: async (themeMode: ThemeMode) => {
      await window.api.theme.setThemeMode(themeMode)
      set((state) => ({
        ...state,
        themeMode,
        theme: themeMode === 'system' ? state.nativeTheme : themeMode
      }))
    },
    setIsColors: (isColors: boolean) => {
      window.api.theme.setThemeIsColors(isColors)
      set({ isColors })
    }
  }

  // Immediately initialize the store
  const initialize = async () => {
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
      window.api.theme.onSystemThemeChange((newNativeTheme) => {
        set((state) => ({
          ...state,
          nativeTheme: newNativeTheme,
          theme: state.themeMode === 'system' ? newNativeTheme : state.themeMode
        }))
      })
    } catch (error) {
      throw new Error('Failed to initialize theme store')
    }
  }

  // Call initialize immediately
  initialize()

  return state
})

// Optional hook for components to ensure store is used in React context
export const useInitializeTheme = () => {
  return useThemeStore()
}
