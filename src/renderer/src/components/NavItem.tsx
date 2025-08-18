import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

interface NavItemProps {
  children: ReactNode
  to: string
  className?: string
  active: boolean
  onClick: () => void
}

function NavItem({ children, to, className = '', active, onClick }: NavItemProps) {
  const classes = `flex items-center gap-2 cursor-pointer transition py-2 px-4 rounded-xl text-nowrap bg-primary hover transition-all ${
    active ? 'bg-stone-200' : ''
  } ${className}`
  return (
    <NavLink to={to} className={classes} onClick={onClick}>
      {children}
    </NavLink>
  )
}
export default NavItem
