import {Component, Input, OnInit} from '@angular/core';
import {AdminServiceService} from "../../service/admin-service.service";
import {UserResponse} from "../../model/user-response";
import {catchError, tap} from "rxjs";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  pageIndex = 0;
  pageSize = 2;
  page = 1;
  pageNumbers: number[] = [];
  public users: UserResponse[] = [];
  totalPages = 0;
  totalElements: number = 0;

  constructor(private adminService: AdminServiceService) {
  }

  ngOnInit(): void {
    this.getUsers(this.pageIndex);
  }

  handlePageChange(page: number) {
    this.page = page - 1;
    this.getUsers(this.page);
  }

  getUsers(page: number) {
    this.adminService.getUsers(page, this.pageSize,).pipe(
      tap(res => {
        this.users = [...res.userProfiles as UserResponse[]] || [];
        this.totalElements = res?.total || 0;
        this.totalPages = res.total !== undefined ? Math.ceil(res.total / this.pageSize) : 0;
        this.pageNumbers = Array.from({length: this.totalPages}, (_, i) => i + 1);
      }),
      catchError(err => {
        throw err;
      })
    ).subscribe();
  }

}
