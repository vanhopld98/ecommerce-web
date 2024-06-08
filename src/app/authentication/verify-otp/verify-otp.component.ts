import {Component, OnInit} from '@angular/core';
import {ShareDataService} from "../../service/share-data.service";
import {AuthenticationService} from "../../service/authentication.service";
import {FormControl, FormGroup} from "@angular/forms";
import {catchError, tap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {AlertService} from "../../service/alert.service";
import {LoadingService} from "../../service/loading.service";

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {

  public email: string = '';
  public formVerifyOTP: FormGroup = new FormGroup({
    otp: new FormControl('')
  });

  ngOnInit(): void {
    this.checkVerify();
  }

  constructor(private shareDataService: ShareDataService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private alertService: AlertService,
              private loadingService: LoadingService) {
    this.email = this.shareDataService.getEmail();
  }

  register() {
    const otp = this.formVerifyOTP.get('otp')?.value;
    let request = this.shareDataService.getRegisterRequest();
    request.otp = otp;
    return this.authenticationService.register(request).pipe(
      tap(() => {
        const requestLogin = {
          username: request.username || '',
          password: request.password || ''
        }
        this.authenticationService.login(requestLogin).pipe(
          tap(response => {
            /* Nếu người dùng ko có role thì không cho đăng nhập */
            if (!response.roles || response.roles.length === 0) {
              this.router.navigateByUrl('/authentication/login')
              this.alertService.alertError('Bạn không có quyền truy cập chức năng này. Vui lòng đăng nhập lại')
              return;
            }
            if (response.roles.includes('ROLE_ADMIN')) {
              this.loadingService.hideWithCallback(() => {
                this.router.navigateByUrl('/admin');
              }, 2000);
              return;
            } else if (response.roles.includes('ROLE_USER')) {
              this.router.navigateByUrl('/');
              this.loadingService.hide();
              return;
            } else {
              this.router.navigateByUrl('/authentication/login')
              this.alertService.alertError('Bạn không có quyền truy cập chức năng này. Vui lòng đăng nhập lại')
              return;
            }
          }),
          catchError(err => {
            return throwError(err)
          })
        ).subscribe();
      }),
      catchError(err => {
        return throwError(err);
      })
    ).subscribe();
  }

  checkVerify() {
    if (!this.email) {
      this.router.navigateByUrl('/not-found');
    }
  }
}
