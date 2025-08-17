import { ipcMain, nativeTheme } from 'electron'

/**
 * Initialize theme system and setup handlers
 */
export const initializeThemeSystem = (): void => {
  ipcMain.handle('theme:light', () => {
    nativeTheme.themeSource = 'light'
  })

  ipcMain.handle('theme:dark', () => {
    nativeTheme.themeSource = 'dark'
  })

  ipcMain.handle('theme:system', () => {
    nativeTheme.themeSource = 'system'
  })
}
