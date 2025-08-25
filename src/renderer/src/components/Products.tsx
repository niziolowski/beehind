import { useProductsStore } from '@renderer/stores/products'
import Button from './Button'
import { useGetAllShopifyProducts } from '@renderer/mutations'

const Products = () => {
  const { products } = useProductsStore()
  const fetchProducts = useGetAllShopifyProducts()
  console.log(products)

  const productList = products.map((product, i) => (
    <div className={`flex items-center gap-3 overflow-hidden bg-background`}>
      {product.image && (
        <img
          src={product.image.src}
          alt={product.title}
          className="w-16 h-16 object-cover object-center"
        />
      )}
      <div key={product.id}>
        <div className="text-lg font-medium">{product.title}</div>
        <p className="text-sm text-gray">{product.tags}</p>
      </div>
    </div>
  ))

  return (
    <div className="p-10 flex flex-col gap-5 h-full overflow-y-scroll">
      <h1 className="text-products font-bold italic">Products</h1>
      <Button onClick={() => fetchProducts.refetch()}>Fetch</Button>
      <div className="flex flex-col rounded-xl overflow-hidden">{productList}</div>
    </div>
  )
}

export default Products
