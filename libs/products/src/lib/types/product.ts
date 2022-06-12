import { Category, CategoryId } from '@nera/category'

export interface Product {
  id?: string
  name: string
  description: string
  richDescription: string
  image: string
  images: string[]
  brand: string
  price: number
  category: Partial<Category>
  countInStock: number
  rating: number
  numReviews: number
  isFeatured: boolean
  createdAt: Date
}

export type ProductId = Pick<Product, 'id'> | string | undefined
