import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthenticationRoutingModule} from './authentication-routing.module';
import {LoginComponent} from './login/login.component';
import {SharedModule} from "../shared/shared.module";
import { RegisterComponent } from './register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyOtpComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AuthenticationModule {
}
