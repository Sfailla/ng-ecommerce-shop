import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ApiResponse, User } from '@nera/types'
import { Observable } from 'rxjs'
import { baseUrl } from '@nera/core'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(`${baseUrl}/users`)
  }
}
