export type Product = {
  id: string
  title: string
  status: 'ACTIVE' | 'ARCHIVED' | 'DRAFT'
  category: {
    id: string
    name: string
  }
  image: {
    id: string
    src: string
  }
  tags: string[]
  metafields: {
    id: string
    key: string
  }[]
}
