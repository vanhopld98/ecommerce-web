import {Component, OnInit} from '@angular/core';
import {LoadingService} from "../../service/loading.service";
import {UserService} from "../../service/user.service";
import {catchError, finalize, tap, throwError} from "rxjs";
import {CategoryResponse} from "../../model/category-response";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public categories: CategoryResponse[] = [];

  constructor(private loadingService: LoadingService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.loadingService.show();
    return this.userService.getCategories().pipe(
      tap(res => {
        this.categories = res?.categories || [];
      }),
      catchError(err => {
        return throwError(err);
      }),
      finalize(() => {
        this.loadingService.hide();
      })
    ).subscribe();
  }
}
