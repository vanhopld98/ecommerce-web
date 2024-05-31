import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import {SharedModule} from "../shared/shared.module";
import { UserListComponent } from './user-list/user-list.component';


@NgModule({
  declarations: [
    HomeComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
