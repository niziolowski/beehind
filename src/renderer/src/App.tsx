import { HashRouter, Route, Routes } from 'react-router-dom'
import ErrorModal from './components/ErrorModal'
import Nav from './components/Nav'
import Settings from './components/Settings'
import { useInitializeTheme } from './stores/themeStore'
import Home from './components/Home'
import StatusBar from './components/StatusBar'

function App() {
  // throw new Error('Test error')
  useInitializeTheme()

  return (
    <div className="flex w-full">
      <HashRouter>
        <Nav />
        <div className="flex flex-col w-full">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          <StatusBar />
        </div>
      </HashRouter>

      <ErrorModal />
    </div>
  )
}

export default App
