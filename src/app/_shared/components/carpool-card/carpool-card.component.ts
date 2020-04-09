import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ICarpool } from '../../interfaces/_index';
import { AuthService, ApiMapboxService } from '../../../_shared/services/_index';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-carpool-card',
  templateUrl: './carpool-card.component.html',
  styleUrls: ['./carpool-card.component.css']
})
export class CarpoolCardComponent implements OnInit, OnChanges {

  @Input() carpool: ICarpool; // a carpool object injected into this component
  @Output() selectedCarpool = new EventEmitter<ICarpool>(); // for emitting carpool objects that were selected by the user
  headerImage$: Observable<string>; // for displaying mapbox card-header image
  userIsParticipant: boolean; // for displaying different "join" button
  participantsList: Array<string>;  // for displaying list of participant names

  constructor(
    private apiMapboxService: ApiMapboxService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    // when input changes, fetch its respective static map
    this.headerImage$ = this.getStaticMap(this.carpool);

    // put participants name into array
    this.participantsList = Object.values(this.carpool.participants);

    // see if current user is a participant of the carpool (for button switching)
    const userId = this.authService.loggedInUser.uid;
    const foundParticipant = this.carpool.participants.hasOwnProperty(userId);
    this.userIsParticipant = foundParticipant ? true : false;
  }

  getStaticMap(carpool: ICarpool) {
    // get the lat/lon coordinates from the passed in carpool and query
    // for its static map using mapbox API
    const lat = carpool.meetupPoint.geometry.coordinates[1];
    const lon = carpool.meetupPoint.geometry.coordinates[0];
    return this.apiMapboxService.getStaticMap(lat, lon);
  }

  onJoinClick(carpool: ICarpool) {
    this.selectedCarpool.emit(carpool);
  }

  onViewClick(carpool: ICarpool) {
    this.router.navigate([`/view/${carpool.carpoolId}`]);
  }

}
