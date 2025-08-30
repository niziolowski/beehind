import { useErrorStore } from '@renderer/stores'
import Button from './Button'
import { FiAlertTriangle } from 'react-icons/fi'
import Modal from './Modal'

const ErrorModal = () => {
  const { error, clearError } = useErrorStore()

  if (!error) return null

  const errorMessage = typeof error === 'string' ? error : error.message

  return (
    <Modal onClose={clearError}>
      <div className="flex flex-col gap-5">
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
    </Modal>
  )
}

export default ErrorModal
