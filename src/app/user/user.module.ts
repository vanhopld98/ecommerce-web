import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {UserRoutingModule} from './user-routing.module';
import {SharedModule} from "../shared/shared.module";
import {CartComponent} from './cart/cart.component';
import {ShopComponent} from './shop/shop.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';


@NgModule({
  declarations: [
    HomeComponent,
    CartComponent,
    ShopComponent,
    ProductDetailComponent
  ],
  exports: [
    CartComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule {
}
