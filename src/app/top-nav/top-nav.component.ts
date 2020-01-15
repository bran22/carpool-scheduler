import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  navigationMenu: MenuItem[] = [
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

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  navigateToRoute(path: string) {
    this.router.navigate([path]);
  }

}
