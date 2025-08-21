import Shopify from 'shopify-api-node'
import { BaseDatabaseService } from './base'
import { safeStorage } from 'electron'
import { ShopifyCredentials } from '../types/database'

export interface ConnectionTestResult {
  status: 'success' | 'failed' | 'offline'
  message: string
}

export class ShopifyRepository extends BaseDatabaseService {
  // Get Shopify Credentials
  async getShopifyCredentials(): Promise<ShopifyCredentials | null> {
    const db = this.ensureDb()
    await db.read()

    if (!db.data.settings.shopifyCredentials) return null

    const encryptedToken = db.data.settings.shopifyCredentials.accessToken

    const buffer = Buffer.from(encryptedToken, 'base64')
    const decryptedToken = safeStorage.decryptString(buffer)

    return {
      shopName: db.data.settings.shopifyCredentials.shopName,
      accessToken: decryptedToken
    }
  }

  async testShopifyConnection(credentials: ShopifyCredentials): Promise<ConnectionTestResult> {
    try {
      // Initialize Shopify client with provided credentials
      const shopify = new Shopify({
        shopName: credentials.shopName,
        accessToken: credentials.accessToken,
        autoLimit: true
      })

      // Test connection with a lightweight API call to fetch shop details
      const shop = await shopify.shop.get()

      const db = this.ensureDb()
      await db.read()

      const encryptedToken = safeStorage.encryptString(credentials.accessToken)

      // Update the encrypted access token in the database
      db.data.settings.shopifyCredentials ??= {
        shopName: credentials.shopName,
        accessToken: encryptedToken.toString('base64')
      }

      // Write changes to the database
      await db.write()

      return {
        status: 'success',
        message: `Connected to Shopify store: ${shop.name} (${shop.email})`
      }
    } catch (error: any) {
      // Handle specific Shopify API errors
      if (error.statusCode === 401) {
        return {
          status: 'failed',
          message: 'Invalid credentials: Check your shop name or access token.'
        }
      } else if (error.statusCode === 403) {
        return {
          status: 'failed',
          message: 'Access denied: Ensure the access token has required permissions.'
        }
      } else if (error.message.includes('ENOTFOUND') || error.message.includes('network')) {
        // Handle network issues for offline-first app
        return {
          status: 'offline',
          message: 'No internet connection. Using cached data if available.'
        }
      } else {
        // Generic error handling
        return {
          status: 'failed',
          message: `Connection failed: ${error.message || 'Unknown error'}`
        }
      }
    }
  }
}
