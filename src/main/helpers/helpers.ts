import { app, BrowserWindow } from 'electron'
import fs from 'fs'
import path from 'path'

// Function to save window state
export const saveWindowState = (mainWindow: BrowserWindow, windowState: WindowState): void => {
  if (!mainWindow || mainWindow.isDestroyed()) return

  try {
    if (!mainWindow.isMaximized()) {
      const bounds = mainWindow.getBounds()
      windowState = {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
        isMaximized: false
      }
    } else {
      windowState.isMaximized = true
    }

    // Store in app data directory
    const windowStateFile = path.join(app.getPath('userData'), 'window-state.json')
    fs.writeFileSync(windowStateFile, JSON.stringify(windowState))
  } catch (error) {
    console.error('Failed to save window state:', error)
  }
}

// Function to load window state
export const loadWindowState = (windowState: WindowState): WindowState => {
  const windowStateFile = path.join(app.getPath('userData'), 'window-state.json')

  try {
    if (fs.existsSync(windowStateFile)) {
      const savedState = JSON.parse(fs.readFileSync(windowStateFile, 'utf8'))
      return { ...windowState, ...savedState }
    }
  } catch (error) {
    console.error('Failed to load window state:', error)
  }

  return windowState
}
