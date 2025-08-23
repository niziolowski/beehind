import LoadingSpinner from './LoadingSpinner'

interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
  className?: string
  loading?: boolean
}

const Button = ({ onClick, children, className, loading }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`relative overflow-hidden bg-home select-none cursor-pointer text-font-light italic text-nowrap hover transition-all px-3 py-2 h-10 rounded-xl ${className}`}
    >
      {children}
      {loading && (
        <div className="absolute bg-home inset-0 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </button>
  )
}
export default Button
