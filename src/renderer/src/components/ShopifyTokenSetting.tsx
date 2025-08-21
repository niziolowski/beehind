import { FiKey, FiShoppingCart } from 'react-icons/fi'
import Button from './Button'
import Input from './Input'

const ShopifyConfiguration = () => {
  //TODO: Setup store for Shopify token
  return (
    <div className="px-10 flex flex-col gap-5">
      <h2>Shopify Configuration</h2>
      <div className="flex flex-col gap-2">
        <label className="flex pl-2 items-center gap-2">Store address</label>
        <div className="flex items-center gap-3">
          <Input
            className="max-w-96"
            placeholder="store-name.myshopify.com"
            icon={<FiShoppingCart />}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="flex pl-2 items-center gap-2">Shopify Token</label>
        <div className="flex items-center gap-3">
          <Input className="max-w-96" placeholder="shpat_123456789..." icon={<FiKey />} />
          <Button onClick={() => {}}>Verify</Button>
        </div>
      </div>
    </div>
  )
}

export default ShopifyConfiguration
