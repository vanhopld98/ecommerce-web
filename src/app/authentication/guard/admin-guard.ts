import {Injectable} from "@angular/core";
import {Router, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthenticationService} from "../../service/authentication.service";
import {AlertService} from "../../service/alert.service";

@Injectable({
  providedIn: 'root'
})

export class AdminGuard {

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private alert: AlertService) {
  }

  canActivate(): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authenticationService.currentUserValue;
    console.log(currentUser)
    if (currentUser == null) {
      this.router.navigateByUrl('/authentication/login');
      this.alert.alertError('Vui lòng đăng nhập để thực hiện chức năng này!')
      return false;
    }
    const roles = currentUser.roles;
    if (!roles?.includes('ROLE_ADMIN')) {
      this.router.navigateByUrl('/authentication/login');
      this.alert.alertError('Bạn không có quyền truy cập chức năng này')
      return false;
    }
    return true;
  }

}
