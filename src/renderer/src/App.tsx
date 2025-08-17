import { useCallback, useEffect, useState } from 'react'
import Settings from './components/Settings'
import { useErrorStore } from './stores'
import ErrorModal from './components/ErrorModal'

function App() {
  const [shopifyToken, setShopifyToken] = useState<string | null>(null)
  const showError = useErrorStore((state) => state.showError)
  const handleInputChange = (e: any): void => {
    if (!e.target.value) return
    setShopifyToken(e.target.value)
  }

  useEffect(() => {
    const handler = async () => {
      try {
        const token = await window.api.database.getShopifyToken()
        console.log(token)
        return setShopifyToken(token)
      } catch (error) {
        console.error(error)
        return null
      }
    }

    handler()
  }, [showError])

  const handleSave = useCallback(async () => {
    if (shopifyToken) await window.api.database.updateShopifyToken(shopifyToken)
  }, [shopifyToken])

  return (
    <div className="bg-background">
      <button
        onClick={() => {
          window.api.theme.light()
        }}
        className="border"
      >
        Toggle Light Mode
      </button>
      <button
        onClick={() => {
          window.api.theme.dark()
        }}
        className="border"
      >
        Toggle Dark Mode
      </button>
      <button
        onClick={() => {
          window.api.theme.system()
        }}
      >
        Reset to System Theme
      </button>
      <Settings />
      <input onChange={handleInputChange} className="border" />
      <button onClick={handleSave}>test</button>
      <div>{shopifyToken}</div>
      <ErrorModal />
    </div>
  )
}

export default App
