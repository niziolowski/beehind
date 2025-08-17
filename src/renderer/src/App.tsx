import ErrorModal from './components/ErrorModal'

function App() {
  // throw new Error('Test error')
  return (
    <div className="w-full h-full bg-background flex">
      <div className="w-1/4 h-screen bg-primary">sidebar</div>
      <div>content</div>
      <ErrorModal />
    </div>
  )
}

export default App
