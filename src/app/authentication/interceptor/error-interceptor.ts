import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {AlertService} from "../../service/alert.service";
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private alertService: AlertService,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          if (!this.authenticationService?.currentUser) {
            /* Làm mới token */
            console.log('làm mới token')
          } else {
            this.authenticationService.logout();
            this.alertService.alertError('Bạn cần đăng nhập trước khi tiếp tục');
            this.router.navigateByUrl('/login')
          }
        } else if (err.status === 403) {
          this.alertService.alertError('Bạn không có quyền truy cập vào trang này');
        } else if (err.status === 500 || err.status === 503) {
          this.alertService.alertError('Dịch vụ tạm thời gián đoạn. Vui lòng thử lại sau ít phút.');
        } else if (err.status === 404) {
          this.alertService.alertError('Không tìm thấy dữ liệu tương ứng');
        } else if (err.status === 400) {
          this.alertService.alertError(err.error?.message);
        }
      }
    }));
  }

}
