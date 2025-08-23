import { ipcMain, dialog, shell } from 'electron'
import { promises as fs } from 'fs'
import { databaseService } from './index'
import { DatabaseSchema, ShopifyCredentials, Theme, ThemeMode } from '../types/database'
import Shopify from 'shopify-api-node'

/**
 * Database IPC handlers
 * Handles all database-related communication between main and renderer processes
 */

export const setupGeneralHandlers = () => {
  // Backup database
  ipcMain.handle('db:backup', async (): Promise<string> => {
    return databaseService.backup()
  })

  // Get database file path
  ipcMain.handle('db:getDatabasePath', async (): Promise<string> => {
    return databaseService.getDatabasePath()
  })

  // Open database location
  ipcMain.handle('db:openDatabaseLocation', async (): Promise<void> => {
    const dbPath = databaseService.getDatabasePath()
    if (dbPath) {
      shell.showItemInFolder(dbPath) // Show the given file in a file manager. If possible, select the file.
    }
  })

  // Export database to file
  ipcMain.handle(
    'db:exportToFile',
    async (): Promise<{ success: boolean; path?: string; error?: string }> => {
      try {
        const result = await dialog.showSaveDialog({
          title: 'Export Database',
          defaultPath: `magazyn-shof-export-${new Date().toISOString().split('T')[0]}.json`,
          filters: [
            { name: 'JSON Files', extensions: ['json'] },
            { name: 'All Files', extensions: ['*'] }
          ]
        })

        if (result.canceled || !result.filePath) {
          return { success: false, error: 'Export cancelled' }
        }

        const data = await databaseService.exportData()
        await fs.writeFile(result.filePath, JSON.stringify(data, null, 2), 'utf8')

        return { success: true, path: result.filePath }
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }
    }
  )

  // Get database export data (for preview)
  ipcMain.handle('db:getExportData', async (): Promise<DatabaseSchema> => {
    return databaseService.exportData()
  })
}

export const setupSettingsHandlers = () => {
  // Get Shopify credentials
  ipcMain.handle('shopify:getCredentials', async (): Promise<ShopifyCredentials | null> => {
    return databaseService.shopify.getShopifyCredentials()
  })

  // Update Shopify Token
  ipcMain.handle(
    'shopify:testConnection',
    async (_, credentials: ShopifyCredentials): Promise<Shopify.IShop> => {
      return databaseService.shopify.testShopifyConnection(credentials)
    }
  )

  // Get Native Theme
  ipcMain.handle('theme:getNativeTheme', (): Promise<Theme | null> => {
    return databaseService.settings.getNativeTheme()
  })

  // Set Native Theme
  ipcMain.handle('theme:setNativeTheme', (_, nativeTheme: Theme): Promise<Theme> => {
    return databaseService.settings.setNativeTheme(nativeTheme)
  })

  // Get Theme mode
  ipcMain.handle('theme:getMode', (): Promise<ThemeMode | null> => {
    return databaseService.settings.getThemeMode()
  })

  // Set Theme mode
  ipcMain.handle('theme:setMode', (_, mode: ThemeMode): Promise<ThemeMode> => {
    return databaseService.settings.setThemeMode(mode)
  })

  // Get Theme colors
  ipcMain.handle('theme:getIsColors', (): Promise<boolean | null> => {
    return databaseService.settings.getThemeIsColors()
  })

  // Set Theme colors
  ipcMain.handle('theme:setIsColors', (_, isColors: boolean): Promise<boolean> => {
    return databaseService.settings.setThemeIsColors(isColors)
  })
}
/**
 * Initialize database and setup handlers
 */
export const initializeDatabaseSystem = async (): Promise<void> => {
  try {
    await databaseService.initialize()
    setupGeneralHandlers()
    setupSettingsHandlers()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to initialize database system:', error)
    throw error
  }
}
