export interface User {
  id: string
  name: string
  email: string
  password: string
  phone: string
  street: string
  apartment: string
  city: string
  zip: string
  country: string
  isAdmin: boolean
}

export type UserId = Pick<User, 'id'> | string
