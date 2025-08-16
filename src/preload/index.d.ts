import { ElectronAPI } from '@electron-toolkit/preload'

interface ApiHandler {
  database: {
    getShopifyToken: () => Promise<string | null>
    updateShopifyToken: (token: string) => Promise<string>
  }
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: ApiHandler
  }
}
