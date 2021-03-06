import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, ApiDatabaseService } from '../_shared/services/_index';
import {MenuItem} from 'primeng/api';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { IAppUser } from '../_shared/interfaces/_index';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  navigationMenu: MenuItem[];
  loggedInUser$: Observable<User>;
  appUser$: Observable<IAppUser>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private apiDatabaseService: ApiDatabaseService
  ) {
    this.navigationMenu = [
      {
        label: 'Carpool Scheduler',
        icon: 'pi pi-home',
        routerLink: ['/home'],
        visible: true
      },
      {
        label: 'Carpools',
        routerLink: ['/carpools'],
        visible: false
      },
      {
        label: 'Rides',
        routerLink: ['/rides'],
        visible: false
      },
      {
        label: 'Create',
        routerLink: ['/create'],
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
      if (item.label === 'Carpool Scheduler') {
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
