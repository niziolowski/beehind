import { FallbackProps } from 'react-error-boundary'
import Button from './Button'

const ErrorBoundaryFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="bg-background border p-5">
        <h2 className="text-xl font-semibold text-red-400">Coś poszło nie tak</h2>

        <p className="text-gray-700 break-words">{error.message}</p>

        <div className="flex justify-end">
          <Button onClick={resetErrorBoundary}>OK</Button>
        </div>
      </div>
    </div>
  )
}
export default ErrorBoundaryFallback
