import { HashRouter, Route, Routes } from 'react-router-dom'
import ErrorModal from './components/ErrorModal'
import Nav from './components/Nav'
import Settings from './components/Settings'
import { useThemeStore } from './stores/themeStore'
import Home from './components/Home'
import StatusBar from './components/StatusBar'
import { useEffect } from 'react'
import { useStatusStore } from './stores/statusStore'
import Products from './components/Products'
import Components from './components/Components'
import { useComponentsStore } from './stores'

function App() {
  const { initialize: initializeThemeStore } = useThemeStore()
  const { initialize: initializeStatusStore } = useStatusStore()
  const { initialize: initializeComponentsStore } = useComponentsStore()

  useEffect(() => {
    initializeThemeStore()
    initializeStatusStore()
    initializeComponentsStore()
  }, [initializeThemeStore, initializeStatusStore, initializeComponentsStore])

  return (
    <div className="flex w-full">
      <HashRouter>
        <Nav />
        <div className="relative flex flex-col w-full h-screen">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Settings />} />
            <Route path="/rules" element={<Settings />} />
            <Route path="/components" element={<Components />} />
          </Routes>
          <StatusBar />
        </div>
      </HashRouter>

      <ErrorModal />
    </div>
  )
}

export default App
