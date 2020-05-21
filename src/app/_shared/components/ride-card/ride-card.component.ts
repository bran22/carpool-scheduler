import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ICarpoolRide } from '../../interfaces/_index';

@Component({
  selector: 'app-ride-card',
  templateUrl: './ride-card.component.html',
  styleUrls: ['./ride-card.component.css']
})
export class RideCardComponent implements OnInit {

  @Input() ride: ICarpoolRide;
  @Input() showPrefsButton ? = true;

  constructor(
    private router: Router
  ) { }

  /////////////
  // next big thing: on ride card, show the current status of the ride (current meet time, or other requested meet times),
  // who has marked their preferences down (and who we're waiting on), who is driver, etc
  //////////////

  ngOnInit(): void {
    // console.log(this.ride);
  }

  onSetPreferencesClick(rideId: string) {
    // route user to the specific ride preferences page
    this.router.navigate([`/rides/preferences/${rideId}`]);
  }

}
