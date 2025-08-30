export type Theme = 'light' | 'dark'
export type ThemeMode = 'light' | 'dark' | 'system'

// Settings
export type ThemeState = {
  nativeTheme: Theme | null
  themeMode: ThemeMode
  isColors: boolean
}

export interface ShopifyCredentials {
  shopName: string // without .myshopify.com
  accessToken: string
}

export interface Settings {
  shopifyCredentials?: ShopifyCredentials
  theme: ThemeState
}

// Component
export interface Component {
  id: string
  name: string
  description?: string
  quantity: number
  unitCost?: number
  createdAt: string
  updatedAt: string
}

// Database schema interface
export interface DatabaseSchema {
  components: Component[]
  settings: Settings
}
