import { HashRouter, Route, Routes } from 'react-router-dom'
import ErrorModal from './components/ErrorModal'
import Nav from './components/Nav'
import Settings from './components/Settings'

function App() {
  // throw new Error('Test error')

  return (
    <div className="flex w-full">
      <HashRouter>
        <Nav />
        <Routes>
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </HashRouter>

      <ErrorModal />
    </div>
  )
}

export default App
