import { FiKey } from 'react-icons/fi'
import Button from './Button'

const ShopifyTokenSetting = () => {
  //TODO: Setup store for Shopify token
  return (
    <div className="px-10">
      <div className="flex items-center gap-2">
        <FiKey />
        Shopify Token
      </div>
      <div className="flex items-center gap-3">
        <div>
          <input id="shopify-token" type="text" className="border rounded-xl h-10 bg-white" />
        </div>
        <Button onClick={() => {}}>Verify</Button>
      </div>
    </div>
  )
}

export default ShopifyTokenSetting
