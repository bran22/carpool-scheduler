import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICarpoolRide } from '../_shared/interfaces/_index';
import { ApiDatabaseService, AuthService } from '../_shared/services/_index';

@Component({
  selector: 'app-view-rides',
  templateUrl: './view-rides.component.html',
  styleUrls: ['./view-rides.component.css']
})
export class ViewRidesComponent implements OnInit {

  upcomingRides$: Observable<ICarpoolRide[]>;

  constructor(
    private apiDatabaseService: ApiDatabaseService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const user = this.authService.getLoggedInUserIdAndName();

    this.upcomingRides$ = this.apiDatabaseService.showUpcomingRidesForUser(user);
  }

}
