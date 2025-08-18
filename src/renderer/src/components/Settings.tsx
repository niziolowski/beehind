import { useCallback, useEffect, useState } from 'react'
import ShopifyTokenSetting from './ShopifyTokenSetting'

const Settings = () => {
  const [shopifyToken, setShopifyToken] = useState<string | null>(null)
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
        throw new Error('Failed to fetch Shopify token')
        return null
      }
    }

    handler()
  }, [])

  const handleSave = useCallback(async () => {
    if (shopifyToken) await window.api.database.updateShopifyToken(shopifyToken)
  }, [shopifyToken])

  return (
    <div className="bg-background w-full">
      <h1 className="p-10">Settings</h1>
      <ShopifyTokenSetting />
    </div>
  )

  return (
    <div className="w-full h-full bg-background">
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

      <input onChange={handleInputChange} className="border" />
      <button onClick={handleSave}>test</button>
      <div>{shopifyToken}</div>
    </div>
  )
}
export default Settings
