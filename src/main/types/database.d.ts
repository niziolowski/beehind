export type Theme = 'light' | 'dark'
export type ThemeMode = 'light' | 'dark' | 'system'

export type ThemeState = {
  nativeTheme: Theme | null
  themeMode: ThemeMode
  isColors: boolean
}

export interface Settings {
  shopifyToken: string | null
  theme: ThemeState
}

// Database schema interface
export interface DatabaseSchema {
  settings: Settings
}
