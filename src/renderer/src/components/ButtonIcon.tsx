import { JSX } from 'react'

interface ButtonIconProps {
  onClick: () => void
  children: JSX.Element
  className?: string
}

const ButtonIcon = ({ onClick, children, className }: ButtonIconProps) => {
  return (
    <button
      onClick={onClick}
      className={`select-none cursor-pointer text-font transition-all rounded-full hover:bg-primary hover:text-home p-1 flex justify-center items-center ${className}`}
    >
      {children}
    </button>
  )
}
export default ButtonIcon
