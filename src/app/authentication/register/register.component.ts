import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication.service";
import {catchError, finalize, tap} from "rxjs";
import {Router} from "@angular/router";
import {LoadingService} from "../../service/loading.service";
import {ShareDataService} from "../../service/share-data.service";
import {RegisterRequest} from "../../model/register-request";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formRegister: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    phoneNumber: new FormControl(''),
    email: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
  });

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private loadingService: LoadingService,
              private shareDateService: ShareDataService) {
  }

  ngOnInit(): void {
  }

  sendOTP() {
    this.loadingService.show();
    const request = this.buildSendOTPRequest();
    const registerRequest = this.buildRegisterRequest();
    this.saveDataShare(registerRequest);
    return this.authenticationService.sendOTP(request).pipe(
      tap(() => {
        this.loadingService.hideWithCallback(() => {
          this.router.navigateByUrl('/authentication/register/verify')
        });
      }),
      catchError(err => {
        throw err;
      }),
      finalize(() => {
        this.loadingService.hide();
      })
    ).subscribe()
  }

  private saveDataShare(registerRequest: RegisterRequest) {
    this.shareDateService.setRegisterRequest(registerRequest);
    this.shareDateService.setEmail(this.formRegister.get('email')?.value);
  }

  private buildRegisterRequest(): RegisterRequest {
    return {
      username: this.formRegister.get('username')?.value,
      email: this.formRegister.get('email')?.value,
      password: this.formRegister.get('password')?.value,
      phoneNumber: this.formRegister.get('phoneNumber')?.value,
      address: this.formRegister.get('address')?.value,
      firstName: this.formRegister.get('firstName')?.value,
      lastName: this.formRegister.get('lastName')?.value,
    };
  }

  private buildSendOTPRequest() {
    return {
      username: this.formRegister.get('username')?.value,
      email: this.formRegister.get('email')?.value,
      type: 'REGISTER'
    };
  }
}
