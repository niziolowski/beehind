import { Product } from '@main/types/product'
import { create } from 'zustand'

interface ProductsState {
  products: Product[]
  setProducts: (products: Product[]) => void
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  setProducts: (products) => set({ products })
}))
