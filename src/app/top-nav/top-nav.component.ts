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
        routerLink: ['/'],
        visible: true
      },
      {
        label: 'Scheduler',
        routerLink: ['/scheduler'],
        visible: true
      },
      {
        label: 'Join',
        routerLink: ['/join'],
        visible: false
      },
      {
        label: 'blah',
        routerLink: ['/'],
        visible: false
      },
      {
        label: 'blah',
        routerLink: ['/'],
        visible: false
      }
    ];
  }

  ngOnInit() {
    // top nav subscribes to the BehaviorSubject of whether a user is logged in
    // so that whenever that changes, we can update the view accordingly
    this.authService.isUserLoggedIn$.subscribe( res => {
      this.isUserLoggedIn = res;
      this.navigationMenu = this.setMenuItemVisibility(this.navigationMenu);
    });
  }

  setMenuItemVisibility(menu: MenuItem[]) {
    // if login state changes, enable/disable menu items as needed
    menu.forEach( item => {
      if (item.label === 'Home' || item.label === 'Scheduler') {
        item.visible = true;
      } else {
        item.visible = this.isUserLoggedIn;
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
