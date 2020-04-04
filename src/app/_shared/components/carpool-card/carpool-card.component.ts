import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ICarpool } from '../../interfaces/carpool';
import { MapboxStaticApiService } from '../../services/mapbox-static-api.service';
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

  constructor(
    private mapboxStaticApiService: MapboxStaticApiService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    // when input changes, fetch its respective static map
    this.headerImage$ = this.getStaticMap(this.carpool);
  }

  getStaticMap(carpool: ICarpool) {
    // get the lat/lon coordinates from the passed in carpool and query
    // for its static map using mapbox API
    const lat = carpool.meetupPoint.geometry.coordinates[1];
    const lon = carpool.meetupPoint.geometry.coordinates[0];
    return this.mapboxStaticApiService.getStaticMap(lat, lon);
  }

  onJoinClick(carpool: ICarpool) {
    this.selectedCarpool.emit(carpool);
  }

}
