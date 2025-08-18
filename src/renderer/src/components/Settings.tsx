import { useCallback, useEffect, useState } from 'react'
import ShopifyTokenSetting from './ShopifyTokenSetting'
import ThemeSelector from './ThemeSelector'

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
    <div className="bg-background w-full pt-10 flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <h1 className="px-10">Settings</h1>
        <ShopifyTokenSetting />
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="px-10">Theme</h1>
        <ThemeSelector />
      </div>
    </div>
  )
}
export default Settings
