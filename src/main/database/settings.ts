import { nativeTheme } from 'electron'
import { BaseDatabaseService } from './base'
import { Theme, ThemeMode } from '../types/database'

export class SettingsRepository extends BaseDatabaseService {
  // Get Native Theme
  async getNativeTheme(): Promise<Theme | null> {
    const db = this.ensureDb()
    await db.read()

    return db.data.settings.theme.nativeTheme
  }

  // Set Native Theme
  async setNativeTheme(nativeTheme: Theme): Promise<Theme> {
    const db = this.ensureDb()
    await db.read()

    db.data.settings.theme.nativeTheme ??= nativeTheme
    await db.write()
    return nativeTheme
  }

  // Get Theme Mode
  async getThemeMode(): Promise<ThemeMode> {
    const db = this.ensureDb()
    await db.read()

    return db.data.settings.theme.themeMode
  }

  // Set Theme Mode
  async setThemeMode(themeMode: ThemeMode): Promise<ThemeMode> {
    const db = this.ensureDb()
    await db.read()

    db.data.settings.theme.themeMode = themeMode
    nativeTheme.themeSource = themeMode
    await db.write()
    return themeMode
  }

  // Get Theme Colors
  async getThemeIsColors(): Promise<boolean> {
    const db = this.ensureDb()
    await db.read()

    return db.data.settings.theme.isColors
  }

  // Update Theme Colors
  async setThemeIsColors(isColors: boolean): Promise<boolean> {
    const db = this.ensureDb()
    await db.read()

    db.data.settings.theme.isColors = isColors
    await db.write()
    return isColors
  }
}
