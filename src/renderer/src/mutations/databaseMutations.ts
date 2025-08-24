import { useErrorStore } from '@renderer/stores'
import { useMutation } from '@tanstack/react-query'

// Import Database from File
export const useImportFromFile = () => {
  const { showError } = useErrorStore()
  return useMutation({
    mutationFn: async (): Promise<{ success: boolean; error?: string }> => {
      try {
        const result = await window.api.database.importFromFile()
        if (result.error == 'Import cancelled') return { success: false, error: 'Import cancelled' }
        if (result.error == 'Invalid database format') {
          showError('Failed to import database: ' + (result.error || 'Unknown error'))
          return { success: false, error: 'Invalid database format' }
        }
        return { success: true }
      } catch (error) {
        showError(
          'Failed to import database: ' + (error instanceof Error ? error.message : 'Unknown error')
        )
        console.error('Error occurred while importing database:', error)
        throw new Error('Failed to import database.')
      }
    }
  })
}

// Export Database to File
export const useExportToFile = () => {
  const { showError } = useErrorStore()
  return useMutation({
    mutationFn: async (): Promise<{ success: boolean; error?: string }> => {
      try {
        const result = await window.api.database.exportToFile()
        if (result.error == 'Export cancelled') return { success: false, error: 'Export cancelled' }
        return { success: true }
      } catch (error) {
        showError(
          'Failed to export database: ' + (error instanceof Error ? error.message : 'Unknown error')
        )
        console.error('Error occurred while exporting database:', error)
        throw new Error('Failed to export database.')
      }
    }
  })
}
