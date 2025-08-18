import { ThemeMode, ThemePalette } from '@main/types/database'
import { create } from 'zustand'

interface ThemeState {
  mode: ThemeMode | null
  palette: ThemePalette | null
  initialize: () => void
  setMode: (mode: ThemeMode) => void
  setPalette: (palette: ThemePalette) => void
}

export const useThemeStore = create<ThemeState>()((set) => ({
  mode: null, // Default to null, will be initialized later
  palette: null,
  initialize: () => {
    window.api.theme.getThemeMode().then((mode) => {
      set((state) => ({ ...state, mode }))
    })
    window.api.theme.getThemePalette().then((palette) => {
      set((state) => ({ ...state, palette }))
    })
  },

  setMode: (mode: ThemeMode) => {
    window.api.theme.setThemeMode(mode)
    return set((state: ThemeState) => ({
      ...state,
      mode
    }))
  },

  setPalette: (palette: ThemePalette) => {
    window.api.theme.setThemePalette(palette)
    return set((state: ThemeState) => ({
      ...state,
      palette
    }))
  }
}))
