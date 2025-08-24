import { useErrorStore } from '@renderer/stores'
import { useMutation } from '@tanstack/react-query'

// Import Database from File
export const useImportFromFile = () => {
  const { showError } = useErrorStore()
  return useMutation({
    mutationFn: async (): Promise<void> => {
      try {
        await window.api.database.importFromFile()
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
    mutationFn: async (): Promise<void> => {
      try {
        await window.api.database.exportToFile()
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
