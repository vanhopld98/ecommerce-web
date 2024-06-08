import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import {SharedModule} from "../shared/shared.module";
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import {NgxPaginationModule} from "ngx-pagination";
import {MatCardModule} from "@angular/material/card";
import { ProductListComponent } from './product/product-list/product-list.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CreateCategoryComponent } from './categories/create-category/create-category.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {NgSwitcheryModule} from "angular-switchery-ios";
import { CategoryDetailComponent } from './categories/category-detail/category-detail.component';


@NgModule({
  declarations: [
    HomeComponent,
    UserListComponent,
    UserEditComponent,
    UserDetailComponent,
    ProductListComponent,
    CategoryListComponent,
    CreateCategoryComponent,
    CategoryDetailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgxPaginationModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatSlideToggleModule,
    NgSwitcheryModule
  ]
})
export class AdminModule { }
