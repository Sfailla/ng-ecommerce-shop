import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Product, ProductId, Routes, ApiResponse } from '@nera/types'
import { baseUrl } from '@nera/core'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {
    this.http = http
  }

  getProducts(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${baseUrl}/${Routes.Products}`)
  }

  getProductById(id: ProductId): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${baseUrl}/${Routes.Products}/${id}`)
  }

  createProduct(product: Product): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(`${baseUrl}/${Routes.Products}`, product)
  }

  updateProduct(id: ProductId, updatedProduct: Product): Observable<ApiResponse<Product>> {
    return this.http.put<ApiResponse<Product>>(
      `${baseUrl}/${Routes.Products}/${id}`,
      updatedProduct
    )
  }

  deleteProduct(id: ProductId): Observable<ApiResponse<Product>> {
    return this.http.delete<ApiResponse<Product>>(`${baseUrl}/${Routes.Products}/${id}`)
  }
}
