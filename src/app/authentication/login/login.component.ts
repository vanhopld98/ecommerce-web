import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AlertService} from "../../service/alert.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {LoginResponse} from "../../model/loginResponse";
import {HandleExceptionService} from "../../service/handle-exception.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }

  public formLogin: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  public submitted = false;

  constructor(private alertService: AlertService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private handleException: HandleExceptionService) {
  }

  login() {
    this.submitted = true;

    if (this.formLogin.invalid) {
      return;
    }

    const request = {
      username: this.formLogin.get('username')?.value,
      password: this.formLogin.get('password')?.value
    }

    this.authenticationService.login(request).subscribe(
      response => {
        /* Nếu người dùng ko có role thì không cho đăng nhập */
        if (!response.roles || response.roles.length === 0) {
          this.router.navigateByUrl('/login')
          this.alertService.alertError('Bạn không có quyền truy cập chức năng này. Vui lòng đăng nhập lại')
          return;
        }
        this.alertService.alertSuccess("Đăng nhập thành công")
        if (response.roles.includes('ROLE_ADMIN')) {
          this.router.navigateByUrl('/admin');
          return;
        } else if (response.roles.includes('ROLE_USER')) {
          this.router.navigateByUrl('/');
        } else {
          this.router.navigateByUrl('/login')
          this.alertService.alertError('Bạn không có quyền truy cập chức năng này. Vui lòng đăng nhập lại')
          return;
        }
      },
      exception => {
        console.log(exception)
        this.handleException.handleException(exception);
      });
  }

}
