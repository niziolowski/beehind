interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
}

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-primary text-font uppercase text-nowrap hover transition-all px-3 py-2 h-10 rounded-xl"
    >
      {children}
    </button>
  )
}
export default Button
