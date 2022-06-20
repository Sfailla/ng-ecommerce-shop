export interface Category {
  id?: string
  name: string
  icon: string
  color: string
}

export type CategoryId = Pick<Category, 'id'> | string | null | undefined
