import { ThemeMode } from '@main/types/database'
import { nativeTheme } from 'electron'
import { create } from 'zustand'
import { useEffect } from 'react'

interface ThemeState {
  mode: ThemeMode | null
  systemMode: Omit<ThemeMode, 'system'> | null
  isColors: boolean | null
  initialize: () => void
  setMode: (mode: ThemeMode) => void
  setIsColors: (colors: boolean) => void
}

export const useThemeStore = create<ThemeState>()((set) => ({
  mode: null, // Default to null, will be initialized later
  systemMode: null,
  isColors: true,

  initialize: () => {
    window.api.theme.getThemeMode().then((mode) => {
      set((state) => ({ ...state, mode }))
    })
    window.api.theme.getThemeIsColors().then((isColors) => {
      set((state) => ({ ...state, isColors }))
    })

    window.api.theme.getSystemMode().then((systemMode) => {
      set((state) => ({ ...state, systemMode }))
    })

    // Subscribe to system theme changes
    const unsubscribe = window.api.theme.onSystemThemeChange((newTheme) => {
      set((state) => ({ ...state, systemMode: newTheme }))
    })

    // Return cleanup function (not used directly here but good practice)
    return () => {
      unsubscribe()
    }
  },

  setMode: (mode: ThemeMode) => {
    window.api.theme.setThemeMode(mode)
    return set((state: ThemeState) => ({
      ...state,
      mode
    }))
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
