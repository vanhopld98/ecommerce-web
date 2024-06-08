import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, finalize, map, Observable, tap, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LoginResponse} from "../model/loginResponse";
import {LoginRequest} from "../model/loginRequest";
import {Router} from "@angular/router";
import {AlertService} from "./alert.service";
import {LoadingService} from "./loading.service";

const API_LOGIN = `${environment.domain}` + '/api/authentication/login';
const API_LOGOUT = `${environment.domain}` + '/api/authentication/logout';
const API_REGISTER = `${environment.domain}` + '/api/authentication/register';
const API_REFRESH = `${environment.domain}` + '/api/authentication/refresh';
const API_SEND_OTP = `${environment.domain}/api/otp/send`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {

  currentUserSubject: BehaviorSubject<LoginResponse | null> = new BehaviorSubject<LoginResponse | null>(null);
  public currentUser: Observable<LoginResponse | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient,
              private router: Router,
              private alert: AlertService,
              private loadingService: LoadingService) {
    const userFromSession = this.getUserFromSession('user');
    this.currentUserSubject.next(userFromSession);
  }

  ngOnInit(): void {
  }

  getUserFromSession<LoginResponse>(key: string) {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item);
      } catch (error) {
        this.router.navigateByUrl('/authentication/login');
      }
    }
    return null;
  }

  login(request: LoginRequest) {
    return this.http.post<LoginResponse>(API_LOGIN, request)
      .pipe(
        catchError(ex => {
          return throwError(ex);
        }),
        map(user => {
          if (user && user.accessToken) {
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('username', request.username);
            this.currentUserSubject.next(user);
          }
          return user;
        }));
  }

  register(request: any) {
    return this.http.post(API_REGISTER, request);
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
        username: localStorage.getItem('username'),
        refreshToken: loginResponse?.refreshToken
      };
      return this.http.post<LoginResponse>(API_REFRESH, payload, {headers}).pipe(
        map(res => {
          localStorage.setItem('user', JSON.stringify(res));
          localStorage.setItem('token', res.accessToken || '');
          localStorage.setItem('username', payload.username || '');
          this.currentUserSubject.next(res);
          return res; // Trả về kết quả sau khi cập nhật localStorage
        }),
        catchError(err => {
          this.alert.alertError('Có lỗi xảy ra khi làm mới token');
          this.router.navigateByUrl('/authentication/login');
          return throwError(err);
        })
      );
    }
  }

  logout(url: string) {
    this.loadingService.show();
    const usernameStorage = localStorage.getItem('username');
    const request = {
      username: usernameStorage
    }
    const headers = this.buildHeaders();
    return this.http.post(API_LOGOUT, request, {headers}).pipe(
      map(res => {
        localStorage.clear();
        this.loadingService.hide();
        this.router.navigateByUrl(url)
        return res;
      }),
      catchError(err => {
        return throwError(err)
      }),
      finalize(() =>{
        this.loadingService.hide();
      })
    ).subscribe()
  }

  sendOTP(request: any) {
    return this.http.post(API_SEND_OTP, request).pipe(
      map(res => {
        return res;
      }),
      catchError(err => {
        throw throwError(err);
      })
    )
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    return this.currentUserValue?.roles?.includes('ROLE_ADMIN') || false;
  }

  private buildHeaders() {
    return new HttpHeaders()
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .set('Content-Type', 'application/json');
  }

}
