import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  navigationMenu = [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'Scheduler',
      path: '/scheduler'
    },
    {
      name: 'Join',
      path: '/join'
    },
    {
      name: 'blah',
      path: ''
    },
    {
      name: 'blah',
      path: ''
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
