import { useErrorStore } from '@renderer/stores'
import { useProductsStore } from '@renderer/stores/products'
import { useQuery } from '@tanstack/react-query'

// Search Products Query
export const useSearchProducts = (searchTerm: string) => {
  const { showError } = useErrorStore()
  const { products } = useProductsStore()
  return useQuery({
    queryKey: ['searchProducts', searchTerm, products],
    queryFn: async (query) => {
      try {
        const searchTerm = query.queryKey[1] as string
        if (!searchTerm) return products
        const filteredProducts = products.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        return filteredProducts
      } catch (error) {
        showError('Failed to search products. Please try again later.')
        console.error('Error searching products:', error)
        throw new Error('Failed to search products.')
      }
    },
    enabled: !!products.length,
    staleTime: Infinity,
    refetchOnWindowFocus: false
  })
}
