import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, tap, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LoginResponse} from "../model/loginResponse";
import {LoginRequest} from "../model/loginRequest";
import {Router} from "@angular/router";
import {AlertService} from "./alert.service";

const API_LOGIN = `${environment.domain}` + '/api/authentication/login';
const API_LOGOUT = `${environment.domain}` + '/api/authentication/logout';
const API_REGISTER = `${environment.domain}` + '/api/authentication/register';
const API_REFRESH = `${environment.domain}` + '/api/authentication/refresh';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {

  private currentUserSubject: BehaviorSubject<LoginResponse | null> = new BehaviorSubject<LoginResponse | null>(null);
  public currentUser: Observable<LoginResponse | null> = this.currentUserSubject.asObservable();

  dataSubject = new BehaviorSubject<LoginResponse | null>(null);

  constructor(private http: HttpClient,
              private router: Router,
              private alert: AlertService) {
  }

  ngOnInit(): void {
    const userFromSession = this.getUserFromSession('user');
    this.currentUserSubject.next(userFromSession);
  }

  getUserFromSession<LoginResponse>(key: string) {
    const item = sessionStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item);
      } catch (error) {
        this.router.navigateByUrl('/authentication/login');
      }
    }
    return null;
  }

  checkSession<T>(object: T | null): T | null {
    if (!object) {
      this.router.navigateByUrl('/authentication/login');
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

  refresh(): Observable<LoginResponse> {
    const loginResponse = this.getUserFromSession('user');
    if (!loginResponse) {
      this.router.navigateByUrl("/authentication/login");
      this.alert.alertError('Bạn cần đăng nhập trước khi tiếp tục');
      return throwError('User not logged in');
    } else {
      let headers = this.buildHeaders();
      const payload = {
        username: sessionStorage.getItem('username'),
        refreshToken: loginResponse?.refreshToken
      };
      return this.http.post<LoginResponse>(API_REFRESH, payload, { headers }).pipe(
        map(res => {
          sessionStorage.setItem('user', JSON.stringify(res));
          sessionStorage.setItem('token', res.accessToken || '');
          sessionStorage.setItem('username', payload.username || '');
          return res; // Trả về kết quả sau khi cập nhật sessionStorage
        }),
        catchError(err => {
          this.alert.alertError('Có lỗi xảy ra khi làm mới token');
          this.router.navigateByUrl('/authentication/login');
          return throwError(err);
        })
      );
    }
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
    let loginResponse = sessionStorage.getItem('user');
    return this.currentUserValue?.roles?.includes('ROLE_ADMIN') || false;
  }

  private buildHeaders() {
    return new HttpHeaders()
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
      .set('Content-Type', 'application/json');
  }

}
