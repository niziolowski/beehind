import { useThemeStore } from '@renderer/stores/themeStore'
import { ReactNode, useMemo } from 'react'
import { NavLink } from 'react-router-dom'

interface NavItemProps {
  children: ReactNode
  to: string
  className?: string
  active: boolean
  onClick: () => void
}

function NavItem({ children, to, className = '', active, onClick }: NavItemProps) {
  const { systemMode, isColors } = useThemeStore()

  const fontColor = useMemo(() => {
    let color = 'text-font'
    if (systemMode === 'light' && active && isColors) {
      color = 'text-font-light'
    }
    return color
  }, [systemMode, active])

  const classes = `flex select-none items-center gap-2 cursor-pointer transition py-2 px-4 rounded-xl text-nowrap hover transition-all font-serif ${
    active ? 'brightness-90' : ''
  } ${fontColor} ${className}`
  return (
    <NavLink to={to} className={classes} onClick={onClick}>
      {children}
    </NavLink>
  )
}
export default NavItem
