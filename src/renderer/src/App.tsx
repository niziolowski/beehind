import { HashRouter, Route, Routes } from 'react-router-dom'
import ErrorModal from './components/ErrorModal'
import Nav from './components/Nav'
import Settings from './components/Settings'
import { useInitializeTheme } from './stores/themeStore'
import { useEffect } from 'react'
import Home from './components/Home'

function App() {
  // throw new Error('Test error')
  useInitializeTheme()

  return (
    <div className="flex w-full">
      <HashRouter>
        <Nav />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </HashRouter>

      <ErrorModal />
    </div>
  )
}

export default App
