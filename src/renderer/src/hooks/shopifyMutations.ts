import { ShopifyCredentials } from '@main/types/database'
import { useErrorStore } from '@renderer/stores'
import { useProductsStore } from '@renderer/stores/productsStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Shopify from 'shopify-api-node'

// Get Shopify Credentials
export const useGetShopifyCredentials = () => {
  const { showError } = useErrorStore()
  return useQuery({
    queryKey: ['shopifyCredentials'],
    queryFn: async () => {
      try {
        const credentials = await window.api.shopify.getShopifyCredentials()
        return credentials
      } catch (error) {
        showError('Failed to fetch Shopify credentials. Please try again later.')
        console.error('Error fetching Shopify credentials:', error)
        throw new Error('Failed to fetch Shopify credentials.')
      }
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false
  })
}

// Set Shopify Credentials
export const useSetShopifyCredentials = () => {
  const queryClient = useQueryClient()
  const { showError } = useErrorStore()
  return useMutation({
    mutationFn: async (credentials: ShopifyCredentials): Promise<ShopifyCredentials> => {
      try {
        const result = await window.api.shopify.setShopifyCredentials(credentials)
        return result
      } catch (error) {
        showError('Failed to verify Shopify credentials. Please check your inputs and try again.')
        console.error('Error occurred while verifying Shopify credentials:', error)
        throw new Error('Failed to verify Shopify credentials.')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shopifyCredentials'] })
    }
  })
}

// Test Shopify Connection
export const useTestShopifyConnection = () => {
  const { showError } = useErrorStore()
  return useMutation({
    mutationFn: async (credentials: ShopifyCredentials): Promise<Shopify.IShop> => {
      try {
        const shop = await window.api.shopify.testShopifyConnection(credentials)

        return shop
      } catch (error) {
        showError('Failed to connect to Shopify. Please check your credentials and try again.')
        console.error('Error occurred while connecting to Shopify:', error)
        throw new Error('Failed to connect to Shopify.')
      }
    }
  })
}

// Get All Shopify Products
export const useGetAllShopifyProducts = () => {
  const { showError } = useErrorStore()
  const { setProducts } = useProductsStore()
  return useQuery({
    queryKey: ['shopifyProducts'],
    queryFn: async () => {
      try {
        const credentials = await window.api.shopify.getShopifyCredentials()
        if (!credentials) throw new Error('Shopify credentials not found.')
        const products = await window.api.shopify.getAllProducts(credentials)

        setProducts(products)
        return products
      } catch (error) {
        showError('Failed to fetch Shopify products. Please try again later.')
        console.error('Error fetching Shopify products:', error)
        throw new Error('Failed to fetch Shopify products.')
      }
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false
  })
}
