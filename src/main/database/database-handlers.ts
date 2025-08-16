import { ipcMain, dialog } from 'electron'
import { promises as fs } from 'fs'
import { databaseService } from './index'
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
  // Get Shopify token
  ipcMain.handle('db:getShopifyToken', async (): Promise<string | null> => {
    return databaseService.settings.getShopifyToken()
  })

  // Update Shopify Token
  ipcMain.handle('db:updateShopifyToken', async (_, token: string): Promise<string> => {
    return databaseService.settings.updateShopifyToken(token)
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
