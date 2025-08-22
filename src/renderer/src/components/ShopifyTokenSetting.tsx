import { FiEye, FiEyeOff, FiInfo, FiKey, FiShoppingCart } from 'react-icons/fi'
import Button from './Button'
import Input from './Input'
import { useEffect, useState } from 'react'
import { useGetShopifyCredentials, useSetShopifyCredentials } from '@renderer/mutations'
import LoadingSpinner from './LoadingSpinner'

const ShopifyConfiguration = () => {
  const [shopName, setShopName] = useState<string>('')
  const [accessToken, setAccessToken] = useState<string>('')
  const [showAccessToken, setShowAccessToken] = useState<boolean>(false)
  const { data: credentials } = useGetShopifyCredentials()
  const { mutate: setShopifyCredentialsMutation, isPending } = useSetShopifyCredentials()

  const handleShopNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShopName(e.target.value)
  }

  const handleAccessTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccessToken(e.target.value)
  }

  useEffect(() => {
    if (credentials) {
      setShopName(credentials.shopName)
      setAccessToken(credentials.accessToken)
    }
  }, [credentials])

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
            className="w-full max-w-[400px]"
            placeholder="store-name.myshopify.com"
            icon={<FiShoppingCart />}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="flex pl-2 items-center gap-2">
          Shopify Token <FiInfo />
        </label>
        <div className="flex items-center gap-3 ">
          <Input
            value={accessToken}
            onChange={handleAccessTokenChange}
            className="flex-1 max-w-[400px]"
            type={showAccessToken ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="shpat_123456789..."
            icon={<FiKey />}
          />
          <button
            className="relative text-sm -left-10 text-font"
            onClick={() => setShowAccessToken(!showAccessToken)}
          >
            {showAccessToken ? <FiEyeOff /> : <FiEye />}
          </button>
          <Button
            className=""
            onClick={() => setShopifyCredentialsMutation({ shopName, accessToken })}
          >
            {isPending ? <LoadingSpinner /> : 'Verify'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ShopifyConfiguration
