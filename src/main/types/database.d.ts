export type Theme = 'light' | 'dark'
export type ThemeMode = 'light' | 'dark' | 'system'

export type ThemeState = {
  nativeTheme: Theme | null
  themeMode: ThemeMode
  isColors: boolean
}

export interface ShopifyCredentials {
  shopName: string // e.g., 'your-shop-name' (without .myshopify.com)
  accessToken: string // Shopify private/custom app access token
}

export interface Settings {
  shopifyCredentials?: ShopifyCredentials
  theme: ThemeState
}

// Database schema interface
export interface DatabaseSchema {
  settings: Settings
}
