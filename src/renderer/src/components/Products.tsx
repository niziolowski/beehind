import Button from './Button'
import { useGetAllShopifyProducts } from '@renderer/mutations'
import ProductList from './ProductList'
import Input from './Input'
import { FiList, FiSearch, FiTable } from 'react-icons/fi'
import ButtonIcon from './ButtonIcon'
import { useSearchProducts } from '@renderer/mutations/productsMutation'
import { useState } from 'react'
import { useProductsStore } from '@renderer/stores/productsStore'

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'table' | 'list'>('list')
  const fetchProducts = useGetAllShopifyProducts()
  const { products } = useProductsStore()

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const { data: searchResults } = useSearchProducts(searchTerm)

  return (
    <div className="p-10 flex flex-col gap-5 w-full h-full overflow-y-scroll max-w-[1000px] mx-auto">
      <div className="flex gap-5 justify-between">
        <h1 className="text-products font-bold italic">Products</h1>
        <Button onClick={() => fetchProducts.refetch()}>Sync From Shopify</Button>
      </div>
      <div className="flex w-full gap-3">
        <Input
          className="flex-1"
          placeholder="Search..."
          icon={<FiSearch />}
          onChange={handleSearchChange}
        />
        <div className="flex">
          <ButtonIcon className="size-10" onClick={() => setViewMode('list')}>
            <FiList />
          </ButtonIcon>
          <ButtonIcon className="size-10" onClick={() => setViewMode('table')}>
            <FiTable />
          </ButtonIcon>
        </div>
      </div>

      {viewMode === 'list' && <ProductList products={searchResults || products} />}
    </div>
  )
}

export default Products
