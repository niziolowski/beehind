interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
  className?: string
}

const Button = ({ onClick, children, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-home text-font uppercase italic text-nowrap hover transition-all px-3 py-2 h-10 rounded-xl ${className}`}
    >
      {children}
    </button>
  )
}
export default Button
