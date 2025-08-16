import { BrowserWindow } from 'electron'

export const memoryMonitor = (mainWindow: BrowserWindow | null): void => {
  // Add memory monitoring
  setInterval(() => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      const memoryUsage = process.memoryUsage()
      console.log('Memory usage:', {
        rss: Math.round(memoryUsage.rss / 1024 / 1024) + ' MB',
        heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024) + ' MB'
      })
    }
  }, 30000) // Every 30 seconds
}
