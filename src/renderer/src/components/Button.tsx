interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
}

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button onClick={onClick} className="border">
      {children}
    </button>
  )
}
export default Button
