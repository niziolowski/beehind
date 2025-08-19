import { ThemeMode } from '@main/types/database'
import { create } from 'zustand'

interface ThemeState {
  mode: ThemeMode | null
  isColors: boolean | null
  initialize: () => void
  setMode: (mode: ThemeMode) => void
  setColors: (colors: boolean) => void
}

export const useThemeStore = create<ThemeState>()((set) => ({
  mode: null, // Default to null, will be initialized later
  isColors: true,

  initialize: () => {
    window.api.theme.getThemeMode().then((mode) => {
      set((state) => ({ ...state, mode }))
    })
    window.api.theme.getThemeIsColors().then((isColors) => {
      set((state) => ({ ...state, isColors }))
    })
  },

  setMode: (mode: ThemeMode) => {
    window.api.theme.setThemeMode(mode)
    return set((state: ThemeState) => ({
      ...state,
      mode
    }))
  },

  setColors: (isColors: boolean) => {
    window.api.theme.setThemeIsColors(isColors)
    return set((state: ThemeState) => ({
      ...state,
      isColors
    }))
  }
}))
