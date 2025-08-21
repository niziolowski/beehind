import { ElectronAPI } from '@electron-toolkit/preload'
import { ShopifyCredentials } from '@main/types/database'
import Shopify from 'shopify-api-node'

interface ApiHandler {
  database: {}
  shopify: {
    getShopifyCredentials: () => Promise<ShopifyCredentials | null>
    testShopifyConnection: (credentials: ShopifyCredentials) => Promise<ConnectionTestResult>
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
