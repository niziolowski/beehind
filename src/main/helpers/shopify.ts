import { Product } from '../types/product'

// Format Shopify product data
export function formatShopifyProduct(product: any): Product {
  return {
    id: product.id,
    title: product.title,
    status: product.status,
    tags: product.tags,
    image: product.media?.nodes[0]?.preview?.image || null,
    metafields:
      product.metafields.nodes.map((metafield: any) => ({
        id: metafield.id,
        key: metafield.key
      })) || [],
    category: product.category || null
  }
}
