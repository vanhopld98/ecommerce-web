import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isFixedTop: boolean = true;
  excludedUrls: string[] = ['/authentication/login', '/authentication/register', '/authentication/register/verify', '/not-found'];
  isAdmin: boolean = false;
  fullName: string = '';
  isLogin: boolean = false;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isFixedTop = !this.excludedUrls.includes(this.router.url);
      }
    });
    this.checkLogin();
  }

  ngOnInit(): void {
    this.isAdmin = this.authenticationService.isAdmin();
  }

  /* !!null -> false */
  checkLogin() {
    this.isLogin = !!this.authenticationService.currentUserValue;
  }

  logout() {
    this.isLogin = !this.isLogin;
    return this.authenticationService.logout('/');
  }
}
