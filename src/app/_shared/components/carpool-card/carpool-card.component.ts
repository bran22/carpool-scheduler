import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ICarpool } from '../../interfaces/carpool';
import { MapboxStaticApiService } from '../../services/mapbox-static-api.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-carpool-card',
  templateUrl: './carpool-card.component.html',
  styleUrls: ['./carpool-card.component.css']
})
export class CarpoolCardComponent implements OnInit, OnChanges {

  @Input() carpool: ICarpool;
  headerImage: Observable<string>;

  constructor(
    private mapboxStaticApiService: MapboxStaticApiService
  ) { }

  ngOnInit() {

  }

  ngOnChanges() {
    console.log(this.carpool);
    this.headerImage = this.getStaticMap(this.carpool);
  }

  getStaticMap(carpool: ICarpool) {
    const lat = carpool.meetupPoint.geometry.coordinates[1];
    const lon = carpool.meetupPoint.geometry.coordinates[0];
    return this.mapboxStaticApiService.getStaticMap(lat, lon);
  }

}
