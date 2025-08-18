import { ElectronAPI } from '@electron-toolkit/preload'

interface ApiHandler {
  database: {
    getShopifyToken: () => Promise<string | null>
    updateShopifyToken: (token: string) => Promise<string>
  }
  theme: {
    getThemeMode: () => ThemeMode
    setThemeMode: (mode: ThemeMode) => ThemeMode
    getThemePalette: () => ThemePalette
    setThemePalette: (palette: ThemePalette) => ThemePalette
  }
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: ApiHandler
  }
}
