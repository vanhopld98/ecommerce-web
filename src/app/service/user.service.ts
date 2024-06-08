import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CategoriesResponse} from "../model/categories-response";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const GET_CATEGORIES = `${environment.domain}/api/categories`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(GET_CATEGORIES);
  }

}
