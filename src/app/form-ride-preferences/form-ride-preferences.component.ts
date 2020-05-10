import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ICarpoolPreference, ICarpoolRide } from '../_shared/interfaces/_index';
import { ApiDatabaseService } from '../_shared/services/_index';

@Component({
  selector: 'app-form-ride-preferences',
  templateUrl: './form-ride-preferences.component.html',
  styleUrls: ['./form-ride-preferences.component.css']
})
export class FormRidePreferencesComponent implements OnInit {

  rideId: string;
  ride$: Observable<ICarpoolRide>;
  preferences$: Observable<ICarpoolPreference[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiDatabaseService: ApiDatabaseService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( res => {
      this.rideId = res.id;
      console.log(this.rideId);
      this.ride$ = this.apiDatabaseService.showRide(this.rideId);
      this.preferences$ = this.apiDatabaseService.showRidePreferences(this.rideId);
    });
  }

}
