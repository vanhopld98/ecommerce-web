import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, map, Observable, throwError} from "rxjs";
import {UserListResponse} from "../model/user-list-response";
import {UserResponse} from "../model/user-response";
import {CategoriesResponse} from "../model/categories-response";

const GET_USERS = `${environment.domain}` + '/api/admin/users';
const GET_USER_DETAIL = `${environment.domain}/api/admin/user/`;
const CREATE_CATEGORY = `${environment.domain}/api/category`;
const GET_CATEGORIES = `${environment.domain}/api/categories`;

@Injectable({
  providedIn: 'root'
})
export class AdminService implements OnInit {

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  getUsers(page: number, size: number): Observable<UserListResponse> {
    let headers = this.buildHeaders();
    let params = new HttpParams().set('page', page).set('size', size)

    return this.http.get<UserListResponse>(GET_USERS, {headers, params}).pipe(
      catchError(ex => {
        return throwError(ex);
      }),
      map(res => {
        return res;
      }));
  }

  getUserDetail(keycloakId: string): Observable<UserResponse> {
    let headers = this.buildHeaders();
    const url = GET_USER_DETAIL + keycloakId;
    return this.http.get<UserResponse>(url, {headers}).pipe(
      catchError(ex => {
        return throwError(ex);
      }),
      map(res => {
        return res;
      }));
  }

  createCategory(request: {}) {
    return this.http.post(CREATE_CATEGORY, request);
  }

  getCategories(): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(GET_CATEGORIES);
  }

  private buildHeaders() {
    return new HttpHeaders()
      .set('Content-Type', 'application/json');
  }
}
