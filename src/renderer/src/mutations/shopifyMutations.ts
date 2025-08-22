import { useErrorStore } from '@renderer/stores'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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
        return null
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
    mutationFn: async (data: { shopName: string; accessToken: string }) => {
      try {
        await window.api.shopify.testShopifyConnection(data)
      } catch (error) {
        showError('Failed to verify Shopify credentials. Please check your inputs and try again.')
        console.error('Error occurred while verifying Shopify credentials:', error)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shopifyCredentials'] })
    }
  })
}
