export type ThemeMode = 'light' | 'dark' | 'system'
export type ThemePalette = 'mono' | 'colorful'

export type Theme = {
  mode: ThemeMode
  palette: ThemePalette
}

export interface Settings {
  shopifyToken: string | null
  theme: Theme
}

// Database schema interface
export interface DatabaseSchema {
  settings: Settings
}
