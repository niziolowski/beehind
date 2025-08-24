import { BrowserWindow, nativeTheme, shell } from 'electron'
import icon from '../../resources/icon.png?asset'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import { loadWindowState, saveWindowState } from './helpers/helpers'

export function createWindow(): BrowserWindow {
  let mainWindow: BrowserWindow | null = null

  // declare windowState
  let windowState: WindowState = {
    width: 1024,
    height: 728,
    isMaximized: false
  }

  // Load saved window state
  windowState = loadWindowState(windowState)

  // Create the browser window.
  mainWindow = new BrowserWindow({
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    show: false,
    minWidth: 500,
    minHeight: 600,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    // Top bar
    titleBarStyle: 'hidden', // remove the default titlebar
    // expose window controls in Windows/Linux
    ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {})
  })

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }

    // This prevents window size change on refresh
    windowState = loadWindowState(windowState)

    // Restore maximized state
    if (windowState.isMaximized) {
      mainWindow.maximize()
    }

    if (process.env.START_MINIMIZED) {
      mainWindow.minimize()
    } else {
      mainWindow.show()
    }

    // Notify renderer process about theme change
    const newTheme = nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('theme:systemChanged', newTheme)
    }
  })

  // Save window state when moved or resized
  mainWindow.on('resize', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      saveWindowState(mainWindow, windowState)
    }
  })
  mainWindow.on('move', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      saveWindowState(mainWindow, windowState)
    }
  })
  mainWindow.on('maximize', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      saveWindowState(mainWindow, windowState)
    }
  })
  mainWindow.on('unmaximize', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      saveWindowState(mainWindow, windowState)
    }
  })

  mainWindow.on('close', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      saveWindowState(mainWindow, windowState)
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  return mainWindow
}
