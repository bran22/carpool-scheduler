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

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSetPreferencesClick(rideId: string) {
    // route user to the specific ride preferences page
    this.router.navigate([`/rides/preferences/${rideId}`]);
  }

}
