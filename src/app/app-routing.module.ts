import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutUserComponent} from "./layout/layout-user/layout-user.component";
import {LayoutAdminComponent} from "./layout/layout-admin/layout-admin.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutUserComponent,
    loadChildren: () => import('./user/user.module').then(module => module.UserModule)
  },
  {
    path: 'admin',
    component: LayoutAdminComponent,
    loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
