import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import {SharedModule} from "../shared/shared.module";
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [
    HomeComponent,
    UserListComponent,
    UserEditComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class AdminModule { }
