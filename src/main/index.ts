import { app, BrowserWindow, ipcMain, nativeTheme } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { createWindow } from './createWindow'
import { memoryMonitor } from './memoryMonitor'
import { initializeDatabaseSystem } from './database/database-handlers'
import { initializeTheme } from './theme'

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  // Initialize Database
  await initializeDatabaseSystem()
  await initializeTheme()

  const mainWindow = createWindow()

  // Add memory monitoring
  memoryMonitor(mainWindow)

  // Listen for system theme changes
  nativeTheme.on('updated', () => {
    const newTheme = nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
    // Notify renderer process about theme change
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('theme:systemChanged', newTheme)
    }
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
