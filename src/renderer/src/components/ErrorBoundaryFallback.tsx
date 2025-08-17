import { FallbackProps } from 'react-error-boundary'

const ErrorBoundaryFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="bg-white border p-5">
        <h2 className="text-xl font-semibold text-red-400">Coś poszło nie tak</h2>

        <p className="text-gray-700 break-words">{error.message}</p>

        <div className="flex justify-end">
          <button onClick={resetErrorBoundary}>OK</button>
        </div>
      </div>
    </div>
  )
}
export default ErrorBoundaryFallback
