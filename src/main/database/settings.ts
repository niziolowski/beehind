import { safeStorage } from 'electron'
import { BaseDatabaseService } from './base'

export class SettingsRepository extends BaseDatabaseService {
  async updateShopifyToken(token: string): Promise<string> {
    const db = this.ensureDb()
    await db.read()

    const encryptedToken = safeStorage.encryptString(token)

    db.data.settings.shopifyToken = encryptedToken.toString('base64')
    await db.write()
    return encryptedToken.toString('base64')
  }

  // Get Shopify token
  async getShopifyToken(): Promise<string | null> {
    const db = this.ensureDb()
    await db.read()

    if (!db.data.settings.shopifyToken) return null

    const encryptedToken = db.data.settings.shopifyToken

    const buffer = Buffer.from(encryptedToken, 'base64')
    const decryptedToken = safeStorage.decryptString(buffer)

    return decryptedToken
  }
}
