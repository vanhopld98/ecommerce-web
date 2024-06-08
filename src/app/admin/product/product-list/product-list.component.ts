import {Component, OnInit} from '@angular/core';
import {UserResponse} from "../../../model/user-response";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  pageIndex = 0;
  pageSize = 10;
  page = 1;
  public products: UserResponse[] = [];
  totalElements: number = 0;

  ngOnInit(): void {
  }

  handlePageChange(page: number) {
    this.page = page - 1;
    // this.getUsers(this.page);
  }

}
