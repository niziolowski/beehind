import { useErrorStore } from '@renderer/stores'
import { createPortal } from 'react-dom'
import Button from './Button'
import { FiAlertTriangle } from 'react-icons/fi'
import { useEffect } from 'react'

const ErrorModal = () => {
  const { error, clearError } = useErrorStore()

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' || e.key === 'Enter') {
      clearError()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  if (!error) return null

  const errorMessage = typeof error === 'string' ? error : error.message

  return createPortal(
    <div
      onClick={(e) => e.target === e.currentTarget && clearError()}
      className="fixed inset-0 bg-primary/50 backdrop-blur-xs flex items-center justify-center z-50"
    >
      <div className="flex flex-col gap-5 bg-background p-6 rounded-xl max-w-md w-full shadow-lg">
        <h3 className="flex tracking-wider gap-3 justify-start items-center text-3xl font-medium text-red-400">
          <FiAlertTriangle className="h-10 w-10" />
          Error
        </h3>

        <p className="text-base text-font">{errorMessage}</p>

        <div className="flex justify-end">
          <Button className="w-20" onClick={clearError}>
            OK
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ErrorModal
