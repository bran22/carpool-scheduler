import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_shared/services/auth.service';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  navigationMenu: MenuItem[];
  isUserLoggedIn: boolean;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.navigationMenu = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/']
      },
      {
        label: 'Scheduler',
        routerLink: ['/scheduler']
      },
      {
        label: 'Join',
        routerLink: ['/join']
      },
      {
        label: 'blah',
        routerLink: ['/']
      },
      {
        label: 'blah',
        routerLink: ['/']
      }
    ];
  }

  ngOnInit() {
    // top nav subscribes to the BehaviorSubject of whether a user is logged in
    // so that whenever that changes, we can update the view accordingly
    this.authService.isUserLoggedIn$.subscribe( res => {
      this.isUserLoggedIn = res;
      console.log('top nav - is user logged in?', this.isUserLoggedIn);
    });
  }

  onLoginClick() {
    this.authService.login();
  }

  onLogoutClick() {
    this.authService.logout();
  }


}
