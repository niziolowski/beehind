import { ElectronAPI } from '@electron-toolkit/preload'

interface ApiHandler {
  database: {
    getShopifyToken: () => Promise<string | null>
    updateShopifyToken: (token: string) => Promise<string>
  }
  theme: {
    getThemeMode: () => Promise<ThemeMode>
    setThemeMode: (mode: ThemeMode) => Promise<ThemeMode>
    getThemeIsColors: () => Promise<boolean>
    setThemeIsColors: (isColors: boolean) => Promise<boolean>
  }
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: ApiHandler
  }
}
