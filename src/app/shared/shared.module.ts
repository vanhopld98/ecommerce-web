import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    NavbarAdminComponent,
    PaginationComponent,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    NavbarAdminComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
