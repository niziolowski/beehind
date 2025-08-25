import Shopify from 'shopify-api-node'
import { ShopifyCredentials } from '../types/database'

export const getShop = async (credentials: ShopifyCredentials): Promise<Shopify.IShop> => {
  // Initialize Shopify client with provided credentials
  const shopify = new Shopify({
    shopName: credentials.shopName,
    accessToken: credentials.accessToken,
    autoLimit: true
  })

  const shop = await shopify.shop.get()
  return shop
}

export const fetchAllProducts = async (credentials: ShopifyCredentials): Promise<any> => {
  const shopify = new Shopify({
    shopName: credentials.shopName,
    accessToken: credentials.accessToken,
    autoLimit: true
  })

  const query = `
    query {
  products(first: 10) {
    nodes {
      title
      id
      metafields(first: 100) {
        nodes {
          key
          id
        }
      }
      category {
        id
        name
      }
       media(first: 1) {
        nodes {
          preview {
            image {
              src
            }
          }
        }
      }
      status
      tags
    }
  }
}
  `
  const data = await shopify.graphql(query)

  return data.products.nodes as typeof data.products.nodes
}
