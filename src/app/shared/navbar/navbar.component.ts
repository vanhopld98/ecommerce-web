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

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isFixedTop = !this.excludedUrls.includes(this.router.url);
      }
    });
  }

  ngOnInit(): void {
    this.isAdmin = this.authenticationService.isAdmin();
  }

}
