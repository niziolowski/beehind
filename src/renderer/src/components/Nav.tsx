import { FiHome, FiList, FiSettings, FiShoppingCart, FiSidebar, FiUmbrella } from 'react-icons/fi'
import NavItem from './NavItem'
import { useState } from 'react'

const Nav = () => {
  const [view, setView] = useState('settings')
  return (
    <div className="h-screen p-2 bg-primary flex flex-col ">
      <div className="font-bold flex justify-center items-center p-3 font-serif text-2xl">
        BeeHind
      </div>
      <div className="flex flex-col gap-2">
        <NavItem to="/dashboard" active={view === 'dashboard'} onClick={() => setView('dashboard')}>
          <FiHome />
          Home
        </NavItem>

        <NavItem to="/orders" active={view === 'orders'} onClick={() => setView('orders')}>
          <FiSidebar />
          Orders
        </NavItem>

        <NavItem to="/products" active={view === 'products'} onClick={() => setView('products')}>
          <FiShoppingCart />
          Products
        </NavItem>
        <NavItem
          to="/components"
          active={view === 'components'}
          onClick={() => setView('components')}
        >
          <FiList />
          Components
        </NavItem>
        <NavItem to="/rules" active={view === 'rules'} onClick={() => setView('rules')}>
          <FiUmbrella />
          Rules
        </NavItem>
      </div>
      <NavItem
        to="/settings"
        className="mt-auto"
        active={view === 'settings'}
        onClick={() => setView('settings')}
      >
        <FiSettings />
        Settings
      </NavItem>
    </div>
  )
}
export default Nav
