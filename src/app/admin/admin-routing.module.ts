import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {UserListComponent} from "./user-list/user-list.component";
import {CommonModule} from "@angular/common";
import {UserEditComponent} from "./user-edit/user-edit.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserListComponent
  },
  {
    path: 'user/:keycloakId/edit',
    component: UserEditComponent
  },
  {
    path: 'user/:keycloakId/detail',
    component: UserDetailComponent
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
