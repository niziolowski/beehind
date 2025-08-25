import { HashRouter, Route, Routes } from 'react-router-dom'
import ErrorModal from './components/ErrorModal'
import Nav from './components/Nav'
import Settings from './components/Settings'
import { useThemeStore } from './stores/themeStore'
import Home from './components/Home'
import StatusBar from './components/StatusBar'
import { useEffect } from 'react'
import { useSettingsStore } from './stores/settingsStore'
import Products from './components/Products'

function App() {
  const { initialize: initializeThemeStore } = useThemeStore()
  const { initialize: initializeSettingsStore } = useSettingsStore()
  // throw new Error('Test error')

  useEffect(() => {
    initializeThemeStore()
    initializeSettingsStore()
  }, [initializeThemeStore])

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
            <Route path="/components" element={<Settings />} />
          </Routes>
          <StatusBar />
        </div>
      </HashRouter>

      <ErrorModal />
    </div>
  )
}

export default App
