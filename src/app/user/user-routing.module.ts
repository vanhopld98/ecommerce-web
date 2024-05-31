import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CartComponent} from "./cart/cart.component";
import {UserGuard} from "../authentication/guard/user-guard";
import {ShopComponent} from "./shop/shop.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'shop',
    component: ShopComponent
  },
  {
    path: 'detail',
    component: ProductDetailComponent
  }
];

@NgModule({
  exports: [RouterModule],
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserRoutingModule {
}
