import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Category, CategoryId, ApiResponse } from '@nera/types'
import { baseUrl } from '@nera/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {
    this.http = http
  }

  getCategories(): Observable<ApiResponse<Category[]>> {
    return this.http.get<ApiResponse<Category[]>>(`${baseUrl}/categories`)
  }

  getCategoryById(id: CategoryId): Observable<ApiResponse<Category>> {
    return this.http.get<ApiResponse<Category>>(`${baseUrl}/categories/${id}`)
  }

  createCategory(category: Category): Observable<ApiResponse<Category>> {
    return this.http.post<ApiResponse<Category>>(`${baseUrl}/categories`, category)
  }

  updateCategory(id: CategoryId, updatedCategory: Category): Observable<ApiResponse<Category>> {
    return this.http.put<ApiResponse<Category>>(`${baseUrl}/categories/${id}`, updatedCategory)
  }

  deleteCategory(id: CategoryId): Observable<ApiResponse<Category>> {
    return this.http.delete<ApiResponse<Category>>(`${baseUrl}/categories/${id}`)
  }
}
