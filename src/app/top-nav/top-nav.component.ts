import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  navigationMenu: MenuItem[];

  constructor(
    private router: Router
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
        label: 'Create',
        routerLink: ['/create']
      },
      {
        label: 'blah',
        routerLink: ['/']
      }
    ];
  }

  ngOnInit() {
  }

}
