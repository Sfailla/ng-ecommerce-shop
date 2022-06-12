export enum Routes {
  Categories = "categories",
  Products = "products",
  Orders = "orders",
  Users = "users",
}

export interface ApiError extends Error {
  code: string;
  stack: string;
  name: string;
  status: string;
  message: string;
}

type Properties =
  | "products"
  | "product"
  | "category"
  | "categories"
  | "order"
  | "orders";

export type ApiResponse<T> = { [prop in Properties]: T } & {
  message?: string;
  error: ApiError;
};
