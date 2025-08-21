import { ThemeMode } from '@main/types/database'
import { useEffect } from 'react'
import { create } from 'zustand'

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme | null
  themeMode: ThemeMode | null
  nativeTheme: Theme | null
  isColors: boolean | null
  initialize: () => void
  setMode: (mode: ThemeMode) => void
  setIsColors: (colors: boolean) => void
}

export const useThemeStore = create<ThemeState>()((set) => ({
  theme: null,
  themeMode: null, // Default to null, will be initialized later
  nativeTheme: null,
  isColors: true,

  initialize: () => {
    window.api.theme.getThemeMode().then((themeMode) => {
      set((state) => ({ ...state, themeMode }))
    })

    window.api.theme.getThemeIsColors().then((isColors) => {
      set((state) => ({ ...state, isColors }))
    })

    window.api.theme.getNativeTheme().then((nativeTheme) => {
      set((state) => ({ ...state, nativeTheme }))
    })

    // Subscribe to system theme changes
    const unsubscribe = window.api.theme.onSystemThemeChange((nativeTheme) => {
      set((state: ThemeState) => {
        const newState: ThemeState = {
          ...state,
          theme: state.themeMode === 'system' ? nativeTheme : state.themeMode,
          nativeTheme
        }

        return newState
      })
    })

    // Set initial theme value
    set((state: ThemeState) => {
      const newState: ThemeState = {
        ...state,
        theme: state.themeMode === 'system' ? state.nativeTheme : state.themeMode
      }

      return newState
    })

    // Return cleanup function (not used directly here but good practice)
    return () => {
      unsubscribe()
    }
  },

  setMode: (themeMode: ThemeMode) => {
    window.api.theme.setThemeMode(themeMode)

    if (themeMode === 'system')
      return set((state: ThemeState) => {
        return { ...state, themeMode, theme: state.nativeTheme }
      })
    return set((state: ThemeState) => {
      return {
        ...state,
        themeMode,
        theme: themeMode
      }
    })
  },

  setIsColors: (isColors: boolean) => {
    window.api.theme.setThemeIsColors(isColors)
    return set((state: ThemeState) => ({
      ...state,
      isColors
    }))
  }
}))

// Hook to initialize theme system (with cleanup because there are listeners)
export const useInitializeTheme = () => {
  const { initialize } = useThemeStore()

  useEffect(() => {
    const cleanup = initialize()
    return cleanup
  }, [initialize])
}
