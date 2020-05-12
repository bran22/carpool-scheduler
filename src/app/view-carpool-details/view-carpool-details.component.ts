import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ICarpool, GeoJson, ICarpoolRide } from '../_shared/interfaces/_index';
import { ApiDatabaseService } from '../_shared/services/_index';

@Component({
  selector: 'app-view-carpool-details',
  templateUrl: './view-carpool-details.component.html',
  styleUrls: ['./view-carpool-details.component.css']
})
export class ViewCarpoolDetailsComponent implements OnInit {

  carpoolId: string;
  carpool$: Observable<ICarpool>;
  latestRide$: Observable<ICarpoolRide>;
  upcomingRides$: Observable<ICarpoolRide[]>;

  marker: GeoJson;  // marker to be sent to mapbox component for drawing

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiDatabaseService: ApiDatabaseService
  ) { }

  ngOnInit(): void {

    // store carpoolId from route params
    this.activatedRoute.params.subscribe( res => {
      this.carpoolId = res.id;
      this.carpool$ = this.apiDatabaseService.showCarpool(this.carpoolId);
      this.latestRide$ = this.apiDatabaseService.showLatestRideWithPreferences(this.carpoolId);
      this.upcomingRides$ = this.apiDatabaseService.showUpcomingRidesForCarpool(this.carpoolId);
      this.apiDatabaseService.showLatestRideForCarpool(this.carpoolId).subscribe( a => console.log(a));
    });

  }

  sendMarker(point: GeoJson): void {
    this.marker = point;
  }
}
