import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, map, Observable, throwError} from "rxjs";
import {UserListResponse} from "../model/user-list-response";

const GET_USERS = `${environment.domain}` + '/api/admin/users';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService implements OnInit {

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

  private buildHeaders() {
    return new HttpHeaders()
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
      .set('Content-Type', 'application/json');
  }
}
