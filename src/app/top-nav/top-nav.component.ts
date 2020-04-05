import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_shared/services/auth.service';
import { ApiDatabaseService } from '../_shared/services/api-database.service';
import {MenuItem} from 'primeng/api';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { AppUser } from '../_shared/interfaces/app-user';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  navigationMenu: MenuItem[];
  loggedInUser$: Observable<User>;
  appUser$: Observable<AppUser>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private apiDatabaseService: ApiDatabaseService
  ) {
    this.navigationMenu = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/'],
        visible: true
      },
      {
        label: 'Scheduler',
        routerLink: ['/scheduler'],
        visible: true
      },
      {
        label: 'View Carpools',
        routerLink: ['/view'],
        visible: false
      },
      {
        label: 'Create',
        routerLink: ['/create']
      },
      {
        label: 'blah',
        routerLink: ['/'],
        visible: false
      }
    ];
  }

  ngOnInit() {
    this.loggedInUser$ = this.authService.loggedInUser$;
    this.loggedInUser$.subscribe( user => {
      const isUserLoggedIn = user ? true : false;
      // if login state changes, enable/disable menu items
      this.navigationMenu = this.setMenuItemVisibility(this.navigationMenu, isUserLoggedIn);

      if (isUserLoggedIn) {
        this.appUser$ = this.apiDatabaseService.showUser(user.uid);
      }
    });
  }

  setMenuItemVisibility(menu: MenuItem[], isUserLoggedIn: boolean) {
    // if login state changes, enable/disable menu items as needed
    menu.forEach( item => {
      if (item.label === 'Home' || item.label === 'Scheduler') {
        item.visible = true;
      } else {
        item.visible = isUserLoggedIn;
      }
    });
    return menu;
  }

  onLoginClick() {
    this.authService.login();
  }

  onLogoutClick() {
    this.authService.logout();
  }


}
