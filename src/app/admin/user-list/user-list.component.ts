import {Component, OnInit} from '@angular/core';
import {AdminServiceService} from "../../service/admin-service.service";
import {UserResponse} from "../../model/user-response";
import {HandleExceptionService} from "../../service/handle-exception.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  pageIndex = 0;
  pageSize = 10;
  public users: UserResponse[] = [];

  ngOnInit(): void {
  }

  constructor(private adminService: AdminServiceService,
              private handleException: HandleExceptionService) {
    this.getUsers(this.pageIndex, this.pageSize);
  }

  getUsers(pageSize: number, page: number) {
    this.adminService.getUsers(pageSize, page).subscribe(
      response => {
        this.users = response.userProfiles || [];
      },
      exception => {
        this.handleException.handleException(exception);
      }
    );
  }

}
