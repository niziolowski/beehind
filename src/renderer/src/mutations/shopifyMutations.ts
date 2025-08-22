import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// Get Shopify Credentials
export const useGetShopifyCredentials = () => {
  return useQuery({
    queryKey: ['shopifyCredentials'],
    queryFn: () => window.api.shopify.getShopifyCredentials(),
    staleTime: Infinity,
    refetchOnWindowFocus: false
  })
}

// Set Shopify Credentials
export const useSetShopifyCredentials = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { shopName: string; accessToken: string }) =>
      window.api.shopify.testShopifyConnection(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shopifyCredentials'] })
    }
  })
}
