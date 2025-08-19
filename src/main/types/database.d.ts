export type ThemeMode = 'light' | 'dark' | 'system'

export type Theme = {
  mode: ThemeMode
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
