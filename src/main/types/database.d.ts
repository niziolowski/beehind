type ThemeMode = 'light' | 'dark' | 'system'
type ThemePalette = 'mono' | 'colorful'

type Theme = {
  mode: ThemeMode
  palette: ThemePalette
}

interface Settings {
  shopifyToken: string | null
  theme: Theme
}

// Database schema interface
interface DatabaseSchema {
  settings: Settings
}
