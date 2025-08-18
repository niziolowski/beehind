import { create } from 'zustand'

interface ThemeState {
  mode: 'light' | 'dark' | 'system' | null
  palette: 'mono' | 'colorful' | null
  initialize: () => void
  setMode: (mode: ThemeState['mode']) => void
  setPalette: (palette: ThemeState['palette']) => void
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

  setMode: (mode: ThemeState['mode']) => {
    window.api.theme.setThemeMode(mode)
    return set((state: ThemeState) => ({
      ...state,
      mode
    }))
  },

  setPalette: (palette: ThemeState['palette']) => {
    window.api.theme.setThemePalette(palette)
    return set((state: ThemeState) => ({
      ...state,
      palette
    }))
  }
}))
