import { nativeTheme, safeStorage } from 'electron'
import { BaseDatabaseService } from './base'
import { ThemeMode } from '../types/database'

export class SettingsRepository extends BaseDatabaseService {
  // Update Shopify token
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

  // Get Theme Mode
  async getThemeMode(): Promise<ThemeMode | null> {
    const db = this.ensureDb()
    await db.read()

    if (!db.data.settings.theme) {
      db.data.settings.theme = {
        mode: 'system',
        isColors: true
      }
      await db.write()
    }

    return db.data.settings.theme.mode
  }

  // Update Theme Mode
  async setThemeMode(mode: ThemeMode): Promise<ThemeMode> {
    const db = this.ensureDb()
    await db.read()

    // Make sure the theme object exists before setting the mode
    if (!db.data.settings.theme) {
      db.data.settings.theme = {
        mode: 'system',
        isColors: true
      }
    }

    db.data.settings.theme.mode = mode
    nativeTheme.themeSource = mode as ThemeMode
    await db.write()
    return mode
  }

  // Get Theme Colors
  async getThemeIsColors(): Promise<boolean> {
    const db = this.ensureDb()
    await db.read()

    if (!db.data.settings.theme) {
      db.data.settings.theme = {
        mode: 'system',
        isColors: true
      }
      await db.write()
    }

    return db.data.settings.theme.isColors
  }

  // Update Theme Colors
  async setThemeIsColors(isColors: boolean): Promise<boolean> {
    const db = this.ensureDb()
    await db.read()

    // Make sure the theme object exists before setting the mode
    if (!db.data.settings.theme) {
      db.data.settings.theme = {
        mode: 'system',
        isColors: true
      }
    }

    db.data.settings.theme.isColors = isColors
    await db.write()
    return isColors
  }
}
