import { ipcMain, nativeTheme } from 'electron'

type Theme = 'light' | 'dark' | 'system'

/**
 * Initialize theme system and setup handlers
 */
export const initializeThemeSystem = (): void => {
  ipcMain.handle('theme:light', () => {
    nativeTheme.themeSource = 'light' as Theme
  })

  ipcMain.handle('theme:dark', () => {
    nativeTheme.themeSource = 'dark' as Theme
  })

  ipcMain.handle('theme:system', () => {
    nativeTheme.themeSource = 'system' as Theme
  })
}
