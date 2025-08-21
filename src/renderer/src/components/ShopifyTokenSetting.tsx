import { FiInfo, FiKey, FiShoppingCart } from 'react-icons/fi'
import Button from './Button'
import Input from './Input'
import { useEffect, useState } from 'react'

const ShopifyConfiguration = () => {
  const [shopName, setShopName] = useState<string>()
  const [accessToken, setAccessToken] = useState<string>()
  const [showAccessToken, setShowAccessToken] = useState<boolean>(false)
  //TODO: Implement a real function

  const handleShopNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShopName(e.target.value)
  }

  const handleAccessTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccessToken(e.target.value)
  }

  useEffect(() => {
    // Fetch existing Shopify credentials on mount
    const fetchCredentials = async () => {
      const credentials = await window.api.shopify.getShopifyCredentials()
      if (credentials) {
        setShopName(credentials.shopName)
        setAccessToken(credentials.accessToken)
      }
      console.log('Fetched Shopify credentials:', credentials)
    }
    fetchCredentials()
  }, [])

  // function with validation
  const validateInputs = () => {
    if (!shopName || !accessToken) {
      console.error('Shop name and access token are required')
      return false
    }
    return true
  }

  const testShopifyConnection = async (shopName, accessToken) => {
    if (!validateInputs()) return
    await window.api.shopify.testShopifyConnection({ shopName, accessToken })
    console.log('Shopify connection test initiated:', { shopName, accessToken })
  }

  return (
    <div className="px-10 flex flex-col gap-5">
      <h2>Shopify Configuration</h2>
      <div className="flex flex-col gap-2">
        <label className="flex pl-2 items-center gap-2">
          Store name <FiInfo />
        </label>
        <div className="flex items-center gap-3">
          <Input
            value={shopName}
            onChange={handleShopNameChange}
            className="max-w-96"
            placeholder="store-name.myshopify.com"
            icon={<FiShoppingCart />}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="flex pl-2 items-center gap-2">
          Shopify Token <FiInfo />
        </label>
        <div className="flex items-center gap-3">
          <Input
            value={accessToken}
            onChange={handleAccessTokenChange}
            className="max-w-96"
            type={showAccessToken ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="shpat_123456789..."
            icon={<FiKey />}
          />
          <button
            className="text-sm text-secondary hover:text-primary"
            onClick={() => setShowAccessToken(!showAccessToken)}
          >
            {showAccessToken ? 'Hide' : 'Show'} Token
          </button>
          <Button onClick={() => testShopifyConnection(shopName, accessToken)}>Verify</Button>
        </div>
      </div>
    </div>
  )
}

export default ShopifyConfiguration
