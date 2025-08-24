import { ShopifyCredentials } from '@main/types/database'
import { useErrorStore } from '@renderer/stores'
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
    mutationFn: async (data: {
      shopName: string
      accessToken: string
    }): Promise<ShopifyCredentials> => {
      try {
        const credentials = await window.api.shopify.setShopifyCredentials(data)
        return credentials
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
    mutationFn: async (data: { shopName: string; accessToken: string }): Promise<Shopify.IShop> => {
      try {
        const shop = await window.api.shopify.testShopifyConnection(data)

        return shop
      } catch (error) {
        showError('Failed to connect to Shopify. Please check your credentials and try again.')
        console.error('Error occurred while connecting to Shopify:', error)
        throw new Error('Failed to connect to Shopify.')
      }
    }
  })
}
