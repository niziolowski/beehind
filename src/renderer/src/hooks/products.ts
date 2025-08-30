import { Product } from '@main/types/index'
import { useErrorStore } from '@renderer/stores'
import { useProductsStore } from '@renderer/stores/productsStore'
import { useMemo } from 'react'

// Search Products
export const useSearchProducts = (searchTerm: string): Product[] => {
  const { showError } = useErrorStore()
  const { products } = useProductsStore()

  return useMemo(() => {
    try {
      if (!searchTerm) return products
      return products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    } catch (error) {
      console.error('Error searching products:', error)
      showError('Failed to search products. Please try again.')
      return []
    }
  }, [searchTerm, products, showError])
}
