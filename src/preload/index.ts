import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

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
    light: () => ipcRenderer.invoke('theme:light'),
    dark: () => ipcRenderer.invoke('theme:dark'),
    system: () => ipcRenderer.invoke('theme:system')
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
