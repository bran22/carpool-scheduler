import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';

import { GeoJson } from './map';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  items: Observable<any[]>;

  constructor(
    private db: AngularFirestore
  ) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }


  getMarkers(): Observable<any[]> {
    return this.db.collection('/carpools').valueChanges();
  }

  // createMarker(data: GeoJson) {
  //   return this.db.list('/markers')
  //                 .push(data)
  // }

  // removeMarker($key: string) {
  //   return this.db.object('/markers/' + $key).remove()
  // }

}

