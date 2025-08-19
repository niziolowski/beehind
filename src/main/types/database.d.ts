export type ThemeMode = 'light' | 'dark' | 'system'

export type Theme = {
  mode: ThemeMode
  systemMode: Omit<ThemeMode, 'system'> | null
  isColors: boolean
}

export interface Settings {
  shopifyToken: string | null
  theme: Theme
}

// Database schema interface
export interface DatabaseSchema {
  settings: Settings
}
