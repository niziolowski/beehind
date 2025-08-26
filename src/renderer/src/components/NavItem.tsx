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

function NavItem({ children, to, className, active, onClick }: NavItemProps) {
  const { theme, isColors } = useThemeStore()
  const fontColor = useMemo(() => {
    let color = 'text-font'
    console.log(theme)
    if (theme === 'light' && active && isColors) {
      color = 'text-font-inverted'
    }
    return color
  }, [theme, active, isColors])

  const classes = `flex select-none items-center gap-2 cursor-pointer transition-all py-2 px-4 rounded-xl text-nowrap hover:brightness-90 active:scale-95 active:brightness-80 font-serif ${
    active && !isColors ? 'brightness-80' : ''
  } ${fontColor} ${className}`
  return (
    <NavLink to={to} className={classes} onClick={onClick}>
      {children}
    </NavLink>
  )
}
export default NavItem
