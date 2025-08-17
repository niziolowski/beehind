import { useErrorStore } from '@renderer/stores'
import { createPortal } from 'react-dom'

const ErrorModal = () => {
  const { error, clearError } = useErrorStore()

  if (!error) return null

  const errorMessage = typeof error === 'string' ? error : error.message

  return createPortal(
    <div className="fixed inset-0 bg-white/50 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full shadow-lg">
        <h3 className="text-lg font-medium text-red-600 dark:text-red-400">Error</h3>
        <div className="mt-2">
          <p className="text-sm text-gray-700 dark:text-gray-300">{errorMessage}</p>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={clearError}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ErrorModal
