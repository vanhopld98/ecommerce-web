import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LoginResponse} from "../model/loginResponse";
import {LoginRequest} from "../model/loginRequest";
import {Router} from "@angular/router";

const API_LOGIN = `${environment.domain}` + '/api/authentication/login';
const API_LOGOUT = `${environment.domain}` + '/api/authentication/logout';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUserSubject: BehaviorSubject<LoginResponse>;
  public currentUser: Observable<LoginResponse>;

  dataSubject = new BehaviorSubject<LoginResponse | null>(null);

  constructor(private http: HttpClient,
              private router: Router) {
    this.currentUserSubject = new BehaviorSubject<LoginResponse>(this.getUserFromSession('user'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getUserFromSession<LoginResponse>(key: string) {
    const item = sessionStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item);
      } catch (error) {
        this.router.navigateByUrl('/login');
      }
    }
    return null;
  }

  checkSession<T>(object: T | null): T | null {
    if (!object) {
      this.router.navigateByUrl('/login');
    }
    return object;
  }

  login(request: LoginRequest) {
    return this.http.post<LoginResponse>(API_LOGIN, request)
      .pipe(
        catchError(ex => {
          return throwError(ex);
        }),
        map(user => {
          if (user && user.accessToken) {
            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('token', user.accessToken);
            sessionStorage.setItem('username', request.username);
            this.currentUserSubject.next(user);
            this.dataSubject.next(user);
          } else {
            // Nếu không, ném lỗi hoặc xử lý tùy theo logic của bạn
            throw new Error('Invalid user or accessToken');
          }
          return user;
        }));
  }

  logout() {
    const usernameStorage = sessionStorage.getItem('username');
    const request = {
      username: usernameStorage
    }

    return this.http.post(API_LOGOUT, {request})
      .pipe(
        catchError(err => {
          return throwError(err)
        }),
        map(res => {
          return res;
        })
      )
  }

  nextDataSubject(value: any) {
    this.dataSubject.next(value);
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    return this.currentUserValue.roles?.includes('ROLE_ADMIN') || false;
  }
}
