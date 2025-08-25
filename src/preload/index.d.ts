import { ElectronAPI } from '@electron-toolkit/preload'
import { ShopifyCredentials } from '@main/types/database'
import { Product } from '@main/types/product'
import Shopify from 'shopify-api-node'

interface ApiHandler {
  database: {
    getDatabasePath: () => Promise<string>
    openDatabaseLocation: () => Promise<void>
    exportToFile: () => Promise<{ success: boolean; path?: string; error?: string }>
    importFromFile: () => Promise<{ success: boolean; error?: string }>
  }
  shopify: {
    getShopifyCredentials: () => Promise<ShopifyCredentials | null>
    setShopifyCredentials: (credentials: ShopifyCredentials) => Promise<ShopifyCredentials>
    testShopifyConnection: (credentials: ShopifyCredentials) => Promise<Shopify.IShop>
    getAllProducts: (credentials: ShopifyCredentials) => Promise<Product[]>
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
