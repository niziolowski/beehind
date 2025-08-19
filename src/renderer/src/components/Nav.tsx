import { FiList, FiSettings, FiShoppingCart, FiSidebar } from 'react-icons/fi'
import { FaHome, FaSitemap } from 'react-icons/fa'
import NavItem from './NavItem'
import { useEffect, useState, JSX } from 'react'

import { NavLink, useLocation } from 'react-router-dom'
import { useThemeStore } from '@renderer/stores/themeStore'

type NavItem = {
  to: string
  icon: JSX.Element
  label: string
  color: string
}

const navItems: NavItem[] = [
  {
    to: '/home',
    icon: <FaHome />,
    label: 'Home',
    color: 'bg-red'
  },
  {
    to: '/orders',
    icon: <FiSidebar />,
    label: 'Orders',
    color: 'bg-violet'
  },
  {
    to: '/products',
    icon: <FiShoppingCart />,
    label: 'Products',
    color: 'bg-green'
  },
  {
    to: '/components',
    icon: <FiList />,
    label: 'Components',
    color: 'bg-blue'
  },
  {
    to: '/rules',
    icon: <FaSitemap />,
    label: 'Rules',
    color: 'bg-brown'
  }
]

const Nav = () => {
  const [view, setView] = useState<string>('')
  const location = useLocation()

  const { isColors } = useThemeStore()

  useEffect(() => {
    const path = location.pathname.split('/')[1]
    setView(path || 'home')
  }, [location.pathname])

  return (
    <div className="h-screen bg-primary flex flex-col pt-10 border-r border-border">
      <div className="font-bold flex justify-center items-center pb-2 font-serif text-2xl">
        BeeHind
      </div>
      <div className="flex flex-col gap-2 p-2">
        {navItems.map((item) => {
          const active = view === item.label.toLowerCase()

          return (
            <NavItem
              key={item.to}
              className={active && isColors ? `!${item.color}` : ''}
              to={item.to}
              active={active}
              onClick={() => setView(item.label.toLowerCase())}
            >
              {item.icon}
              {item.label}
            </NavItem>
          )
        })}
      </div>

      <div className="mt-auto border-t border-border">
        <NavLink
          className={`flex justify-center items-center gap-2 hover:brightness-95 p-2 ${view === 'settings' ? 'text-font-light bg-font' : 'text-font bg-primary'}`}
          to="/settings"
          onClick={() => setView('settings')}
        >
          <FiSettings />
          Settings
        </NavLink>
      </div>
    </div>
  )
}
export default Nav
