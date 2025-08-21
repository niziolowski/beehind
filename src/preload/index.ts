import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Theme, ThemeMode } from '../main/types/database'

// Custom APIs for renderer
const apiHandler = {
  // Database API
  database: {
    // Settings operations
    getShopifyToken: (): Promise<string> => ipcRenderer.invoke('db:getShopifyToken'),
    updateShopifyToken: (token: string): Promise<string> =>
      ipcRenderer.invoke('db:updateShopifyToken', token)
  },
  theme: {
    getNativeTheme: () => ipcRenderer.invoke('theme:getNativeTheme'),
    setNativeTheme: (nativeTheme: Theme) => ipcRenderer.invoke('theme:setNativeTheme', nativeTheme),
    getThemeMode: () => ipcRenderer.invoke('theme:getMode'),
    setThemeMode: (mode: ThemeMode) => ipcRenderer.invoke('theme:setMode', mode),
    getThemeIsColors: () => ipcRenderer.invoke('theme:getIsColors'),
    setThemeIsColors: (isColors: boolean) => ipcRenderer.invoke('theme:setIsColors', isColors),
    onSystemThemeChange: (callback: (theme: 'light' | 'dark') => void) => {
      const subscription = (_: any, theme: 'light' | 'dark') => callback(theme)
      ipcRenderer.on('theme:systemChanged', subscription)

      // Return unsubscribe function
      return () => {
        ipcRenderer.removeListener('theme:systemChanged', subscription)
      }
    }
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', apiHandler)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = apiHandler
}

export type ApiHandler = typeof apiHandler
