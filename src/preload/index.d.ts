import { ElectronAPI } from '@electron-toolkit/preload'

interface ApiHandler {
  database: {
    getShopifyToken: () => Promise<string | null>
    updateShopifyToken: (token: string) => Promise<string>
  }
  theme: {
    getNativeTheme: () => Promise<Theme | null>
    setNativeTheme: (nativeTheme: Theme) => Promise<Theme>
    getThemeMode: () => Promise<ThemeMode>
    setThemeMode: (mode: ThemeMode) => Promise<ThemeMode>
    getThemeIsColors: () => Promise<boolean>
    setThemeIsColors: (isColors: boolean) => Promise<boolean>
    onSystemThemeChange: (callback: (theme: 'light' | 'dark') => void) => () => void
  }
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: ApiHandler
  }
}
