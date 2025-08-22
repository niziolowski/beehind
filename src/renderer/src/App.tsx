import { HashRouter, Route, Routes } from 'react-router-dom'
import ErrorModal from './components/ErrorModal'
import Nav from './components/Nav'
import Settings from './components/Settings'
import { useThemeStore } from './stores/themeStore'
import Home from './components/Home'
import StatusBar from './components/StatusBar'
import { useEffect } from 'react'

function App() {
  const { initialize: InitializeThemeStore } = useThemeStore()
  // throw new Error('Test error')

  useEffect(() => {
    InitializeThemeStore()
  }, [InitializeThemeStore])

  return (
    <div className="flex w-full">
      <HashRouter>
        <Nav />
        <div className="flex flex-col w-full">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/products" element={<Settings />} />
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
