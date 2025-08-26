import { create } from 'zustand'

interface StatusState {
  isOnline: boolean
  initialize: () => Promise<void>
}

export const useStatusStore = create<StatusState>((set) => ({
  isOnline: false,
  initialize: async () => {
    try {
      const credentials = await window.api.shopify.getShopifyCredentials()
      if (!credentials) set({ isOnline: false })
      if (credentials) {
        const isOnline = await window.api.shopify.testShopifyConnection(credentials)
        set({ isOnline: !!isOnline })
      }
    } catch (error) {
      throw new Error('Failed to initialize settings store')
    }
  }
}))
