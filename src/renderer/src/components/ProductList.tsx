import { Product } from '@main/types/product'
import { FiTag } from 'react-icons/fi'

interface ProductListProps {
  products: Product[]
}

const ProductList = ({ products }: ProductListProps) => {
  const listJSX = products.map((product, i) => {
    return (
      <div
        key={product.id}
        className={`flex items-center gap-2 border border-border p-1 rounded-xl shadow-sm`}
      >
        {product.image && (
          <img
            src={product.image.src}
            alt={product.title}
            className="!w-24 !h-24 object-cover object-center rounded-lg flex-none"
          />
        )}
        <div className="flex flex-col justify-between h-full">
          <div className="text-lg font-medium">{product.title}</div>
          <p className="flex text-sm text-gray gap-1">
            {product.tags.map((tag, i) => {
              if (i > 2) return
              return (
                <span className="flex text-nowrap items-center bg-primary px-2 py-1 rounded-lg gap-1">
                  <FiTag size={12} />
                  {tag}
                </span>
              )
            })}
          </p>
        </div>
      </div>
    )
  })
  return <div className="flex flex-col gap-1">{listJSX}</div>
}

export default ProductList
