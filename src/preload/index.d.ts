import { ElectronAPI } from '@electron-toolkit/preload'
import { Component, ShopifyCredentials } from '@main/types/database'
import { Product } from '@main/types/product'
import Shopify from 'shopify-api-node'
import type { ApiHandler } from './index'

declare global {
  interface Window {
    electron: ElectronAPI
    api: ApiHandler
  }
}
