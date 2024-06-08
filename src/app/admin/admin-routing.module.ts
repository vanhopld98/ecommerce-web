import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {UserListComponent} from "./user/user-list/user-list.component";
import {CommonModule} from "@angular/common";
import {UserEditComponent} from "./user/user-edit/user-edit.component";
import {UserDetailComponent} from "./user/user-detail/user-detail.component";
import {AdminGuard} from "../authentication/guard/admin-guard";
import {ProductListComponent} from "./product/product-list/product-list.component";
import {CategoryListComponent} from "./categories/category-list/category-list.component";
import {CreateCategoryComponent} from "./categories/create-category/create-category.component";
import {CategoryDetailComponent} from "./categories/category-detail/category-detail.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'user',
    component: UserListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'user/:keycloakId/edit',
    component: UserEditComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'user/:keycloakId/detail',
    component: UserDetailComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'categories',
    component: CategoryListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'category/create',
    component: CreateCategoryComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'category/:id',
    component: CategoryDetailComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminRoutingModule {
}
