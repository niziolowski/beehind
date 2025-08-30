import { FiCheck, FiEye, FiEyeOff, FiInfo, FiShoppingCart } from 'react-icons/fi'
import Button from './Button'
import Input from './Input'
import { useEffect, useState } from 'react'
import {
  useGetShopifyCredentials,
  useSetShopifyCredentials,
  useTestShopifyConnection
} from '@renderer/hooks'
import ButtonIcon from './ButtonIcon'
import ModalInfo from './ModalInfo'

const modalContents = {
  shopName: {
    title: 'Where can you find your store name?',
    content:
      '(without .myshopify.com) You can find your store name in your Shopify admin panel under Settings > General.'
  },
  accessToken: {
    title: 'Where can you find your Shopify API access token?',
    content:
      'You can find your Shopify API access token in your Shopify admin panel under Apps > Manage private apps.'
  }
}

const ShopifyConfiguration = () => {
  const [shopName, setShopName] = useState<string>('')
  const [accessToken, setAccessToken] = useState<string>('')
  const [showAccessToken, setShowAccessToken] = useState<boolean>(false)
  const { data: credentials } = useGetShopifyCredentials()
  const { mutateAsync: setShopifyCredentialsMutation } = useSetShopifyCredentials()
  const {
    mutateAsync: testShopifyConnectionMutation,
    isPending: isTestShopifyConnectionPending,
    isSuccess: isTestShopifyConnectionSuccess
  } = useTestShopifyConnection()

  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null)

  const handleShopNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShopName(e.target.value)
  }

  const handleAccessTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccessToken(e.target.value)
  }

  const handleVerifyShopifyCredentials = async () => {
    try {
      const shop = await testShopifyConnectionMutation({ shopName, accessToken })
      if (shop) await setShopifyCredentialsMutation({ shopName, accessToken })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (credentials) {
      setShopName(credentials.shopName)
      setAccessToken(credentials.accessToken)

      //test shopify connection
      testShopifyConnectionMutation({
        shopName: credentials.shopName,
        accessToken: credentials.accessToken
      })
    }
  }, [credentials])

  return (
    <>
      <div className="px-10 flex flex-col gap-5">
        <h2 className="flex items-center gap-3">
          Shopify Configuration{' '}
          {isTestShopifyConnectionSuccess && <FiCheck className="text-success" />}
        </h2>

        <div className="flex flex-col gap-2">
          <div className="flex pl-2 items-center gap-2">
            <div>Store name</div>
            <ButtonIcon onClick={() => setModalContent(modalContents.shopName)}>
              <FiInfo />
            </ButtonIcon>
          </div>
          <div className="flex items-center gap-3">
            <Input
              value={shopName}
              onChange={handleShopNameChange}
              className="w-full max-w-[400px]"
              placeholder="store-name"
              icon={<FiShoppingCart />}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex pl-2 items-center gap-2">
            <div>Shopify Token</div>
            <ButtonIcon onClick={() => setModalContent(modalContents.accessToken)}>
              <FiInfo />
            </ButtonIcon>
          </div>
          <div className="flex items-center gap-3 ">
            <Input
              value={accessToken}
              onChange={handleAccessTokenChange}
              className="flex-1 max-w-[400px]"
              type={showAccessToken ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="shpat_ab12cd34..."
              icon={
                <ButtonIcon
                  className="relative text-sm text-font !p-0"
                  onClick={() => setShowAccessToken(!showAccessToken)}
                >
                  {showAccessToken ? <FiEye /> : <FiEyeOff />}
                </ButtonIcon>
              }
            />

            <Button
              loading={isTestShopifyConnectionPending}
              onClick={handleVerifyShopifyCredentials}
            >
              Verify
            </Button>
          </div>
        </div>
      </div>

      {modalContent && (
        <ModalInfo onClose={() => setModalContent(null)} title={modalContent.title}>
          <p>{modalContent.content}</p>
        </ModalInfo>
      )}
    </>
  )
}

export default ShopifyConfiguration
